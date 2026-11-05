<?php
/**
 * Royal History — Localhost Admin PHP API
 * Brand: Royal History — ইতিহাসের এই দিনে
 * Credits: Royal Technologies (https://www.royaltechbd.com/)
 */

header('Content-Type: application/json; charset=utf-8');

// ── Security Check: STRICTLY LOCALHOST ONLY ──
$remoteIp = $_SERVER['REMOTE_ADDR'] ?? '';
$isLocal = ($remoteIp === '127.0.0.1' || $remoteIp === '::1' || $remoteIp === 'localhost');

if (!$isLocal) {
    http_response_code(403);
    echo json_encode([
        'error' => 'নিরাপত্তা সতর্কতা: অ্যাডমিন এপিআই শুধুমাত্র লোকালহোস্টে কার্যকর।'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

$dbPath = __DIR__ . '/../database/royal_history.sqlite';
$itemsJsonPath = __DIR__ . '/../database/items.json';

try {
    $pdo = new PDO("sqlite:" . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'ডাটাবেজ সংযোগে সমস্যা: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
    exit;
}

function syncItemsJson($pdo, $jsonPath) {
    $stmt = $pdo->query("SELECT * FROM royal_history_items WHERE is_active = 1 ORDER BY target_month ASC, target_day ASC, event_year ASC");
    $items = $stmt->fetchAll();
    file_put_contents($jsonPath, json_encode($items, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? '';

// ── 1. GET: Fetch all items ──
if ($method === 'GET') {
    $stmt = $pdo->query("SELECT * FROM royal_history_items ORDER BY id DESC");
    echo json_encode($stmt->fetchAll(), JSON_UNESCAPED_UNICODE);
    exit;
}

// ── 2. POST: Add new item or trigger generation ──
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if ($action === 'generate') {
        $nodeBin = 'node';
        $scriptPath = escapeshellarg(__DIR__ . '/../scripts/generate-history.js');
        $output = shell_exec("$nodeBin $scriptPath 2>&1");
        
        $todayJsonPath = __DIR__ . '/../cards/today.json';
        $card = file_exists($todayJsonPath) ? json_decode(file_get_contents($todayJsonPath), true) : null;

        echo json_encode([
            'success' => true,
            'message' => 'আজকের কার্ড সফলভাবে রেন্ডার হয়েছে!',
            'output' => $output,
            'card' => $card
        ], JSON_UNESCAPED_UNICODE);
        exit;
    }

    if (!$input || empty($input['title']) || empty($input['event_year']) || empty($input['category'])) {
        http_response_code(400);
        echo json_encode(['error' => 'শিরোনাম, সাল ও ক্যাটাগরি আবশ্যক।'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $categoryPrefix = ($input['category'] === 'bangladesh') ? 'BD' : (($input['category'] === 'world') ? 'WD' : 'DAY');
    $mPad = str_pad($input['target_month'] ?? 1, 2, '0', STR_PAD_LEFT);
    $dPad = str_pad($input['target_day'] ?? 1, 2, '0', STR_PAD_LEFT);
    $rand = strtoupper(substr(bin2hex(random_bytes(2)), 0, 4));
    $uid = $input['uid'] ?? "RH-{$categoryPrefix}-{$mPad}{$dPad}-{$rand}";
    $yearDisplay = $input['event_year_display'] ?? ($input['event_year'] . ' খ্রিস্টাব্দ');

    $stmt = $pdo->prepare("
        INSERT OR REPLACE INTO royal_history_items 
        (uid, category, event_type, event_year, event_year_display, event_date, target_day, target_month, title, summary, description, significance, location, reference, tags, priority, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ");

    $stmt->execute([
        $uid,
        $input['category'],
        $input['event_type'] ?? 'event',
        (int)$input['event_year'],
        $yearDisplay,
        $input['event_date'] ?? "{$input['target_day']} তারিখ",
        (int)($input['target_day'] ?? 1),
        (int)($input['target_month'] ?? 1),
        $input['title'],
        $input['summary'] ?? $input['description'],
        $input['description'] ?? $input['summary'],
        $input['significance'] ?? null,
        $input['location'] ?? null,
        $input['reference'] ?? 'রয়েল হিস্ট্রি আর্কাইভ',
        $input['tags'] ?? '',
        (int)($input['priority'] ?? 1),
        isset($input['is_active']) ? (int)$input['is_active'] : 1
    ]);

    syncItemsJson($pdo, $itemsJsonPath);

    echo json_encode([
        'success' => true,
        'uid' => $uid,
        'message' => 'ঐতিহাসিক ঘটনা ডাটাবেজে যুক্ত হয়েছে!'
    ], JSON_UNESCAPED_UNICODE);
    exit;
}

// ── 3. DELETE: Remove item ──
if ($method === 'DELETE') {
    $id = (int)($_GET['id'] ?? 0);
    if (!$id) {
        http_response_code(400);
        echo json_encode(['error' => 'সঠিক আইডি দিন।'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $stmt = $pdo->prepare("DELETE FROM royal_history_items WHERE id = ?");
    $stmt->execute([$id]);

    syncItemsJson($pdo, $itemsJsonPath);

    echo json_encode(['success' => true, 'message' => 'সফলভাবে ডিলিট করা হয়েছে।'], JSON_UNESCAPED_UNICODE);
    exit;
}
