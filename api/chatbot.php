<?php
// Carregar variáveis do .env
if (file_exists(__DIR__ . '/.env')) {
    $env = parse_ini_file(__DIR__ . '/.env');
    $apiKey = $env['API_KEY'] ?? null;
} else {
    $apiKey = null;
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['message'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Message is required']);
    exit;
}

if (!$apiKey) {
    http_response_code(500);
    echo json_encode(['error' => 'API key not configured']);
    exit;
}

$userMessage = trim($input['message']);

// Prompt do sistema
$systemPrompt = "Você é o assistente virtual da agência de marketing Lumina. 

PERSONALIDADE:
- Seja gentil, amigável e prestativo
- Use linguagem respeitosa e profissional
- Mantenha respostas concisas (máximo 3-4 frases)
- Foque na solução do problema do cliente

SERVIÇOS DA HUMANS MK:
1. Marketing Digital (gestão de redes sociais, anúncios, SEO, tráfego pago)
2. Design e Criação (branding, identidade visual, logotipos, materiais promocionais)
3. Desenvolvimento Web (sites, e-commerce, landing pages, responsivos)
4. Estratégia e Consultoria (planejamento, análise de mercado, transformação digital)

DIRETRIZES:
- Para orçamentos ou questões contratuais, direcione para contato humano
- Use emojis moderadamente
- Se não souber algo, seja honesto e direcione para a equipe

CONTATO:
- WhatsApp: (11) 99999-9999
- Email: contato@lumina.com.br
- Instagram: @lumina

Responda sempre como se fosse o assistente oficial da Lumina.";

// Dados para a API Gemini
$data = [
    'contents' => [
        [
            'role' => 'system',
            'parts' => [
                ['text' => $systemPrompt]
            ]
        ],
        [
            'role' => 'user',
            'parts' => [
                ['text' => $userMessage]
            ]
        ]
    ],
    'generationConfig' => [
        'temperature' => 0.4,
        'topK' => 32,
        'topP' => 0.9,
        'maxOutputTokens' => 200,
        'stopSequences' => ["Lumina:", "Assistant:"]
    ]
];

// Simulação de resposta do chatbot sem depender de API externa
$possibleResponses = [
    "Olá! Como posso ajudar você hoje?",
    "A Lumina oferece serviços de marketing digital, social media, branding e desenvolvimento web.",
    "Nosso time está pronto para ajudar a transformar sua presença digital.",
    "Você pode entrar em contato conosco pelo WhatsApp (51) 99999-9999 para mais informações.",
    "Ficarei feliz em explicar mais sobre nossos serviços de marketing digital.",
    "Que tal marcarmos uma consultoria gratuita para avaliar suas necessidades?",
];

// Simular processamento
usleep(500000); // Espera 0.5 segundos para simular processamento

// Seleciona uma resposta aleatória
$responseIndex = array_rand($possibleResponses);
$botResponse = $possibleResponses[$responseIndex];

$response = json_encode([
    'response' => $botResponse
]);
$httpCode = 200;
$error = null;

// Salvar log para debug
file_put_contents(__DIR__ . "/log_gemini.txt", $response);



if ($error) {
    echo json_encode([
        'error' => 'Erro de conexão: ' . $error,
        'fallback' => 'Desculpe, estou com dificuldades técnicas no momento. Entre em contato conosco pelo WhatsApp: (51) 99999-9999'
    ]);
    exit;
}

if ($httpCode !== 200) {
    echo json_encode([
        'error' => 'Erro na API: ' . $httpCode,
        'fallback' => 'Desculpe, estou com dificuldades técnicas no momento. Entre em contato conosco pelo WhatsApp: (51) 99999-9999'
    ]);
    exit;
}

// A resposta já está no formato correto
echo $response;
?>
