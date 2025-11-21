<?php
// Configurações de CORS para permitir que o React fale com o PHP
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Se for apenas uma verificação de opção (pre-flight), retorna OK
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Apenas aceita POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(["status" => "error", "message" => "Método não permitido"]);
    exit();
}

// Recebe o JSON do React
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    // Tenta pegar via POST tradicional se o JSON falhar
    $data = $_POST;
}

// Configurações do E-mail (MUDE AQUI)
$to = "contato@chromatech.com.br"; // E-mail que vai receber os leads
$subject = "Novo Lead Pré-Venda: " . ($data['Produto'] ?? 'Tupã A1');

// Monta a mensagem
$message = "Novo cadastro na Lista de Espera:\n\n";
$message .= "Nome: " . ($data['Nome'] ?? 'N/A') . "\n";
$message .= "E-mail: " . ($data['email'] ?? 'N/A') . "\n";
$message .= "Telefone: " . ($data['Telefone'] ?? 'N/A') . "\n";
$message .= "Produto: " . ($data['Produto'] ?? 'N/A') . "\n";
$message .= "Data: " . date('d/m/Y H:i:s') . "\n";

// Cabeçalhos para garantir que não vai para SPAM
// Recomendo criar um email 'no-reply@chromatech.com.br' no cPanel para usar aqui
$headers = "From: no-reply@chromatech.com.br" . "\r\n" .
    "Reply-To: " . ($data['email'] ?? $to) . "\r\n" .
    "X-Mailer: PHP/" . phpversion();

// Envia
if (mail($to, $subject, $message, $headers)) {
    echo json_encode(["status" => "success", "message" => "E-mail enviado com sucesso!"]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Falha ao enviar e-mail."]);
}
?>