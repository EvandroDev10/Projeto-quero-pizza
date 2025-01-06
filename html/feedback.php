<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

$response = '';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nome = htmlspecialchars(trim($_POST['nome']));
    $email = htmlspecialchars(trim($_POST['email']));
    $feedback = htmlspecialchars(trim($_POST['feedback']));

    $mail = new PHPMailer(true);
    try {
        // Configurações do servidor SMTP
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'Evandrolopes107@gmail.com'; // Substitua pelo seu e-mail
        $mail->Password = 'gzwz vgzd npif fhvt'; // Substitua pela senha do aplicativo do Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Configuração de remetente e destinatário
        $mail->setFrom($email, $nome);
        $mail->addAddress('Evandrolopes107@gmail.com', 'Evandro Lopes');

        // Conteúdo do e-mail
        $mail->isHTML(true);
        $mail->Subject = 'Feedback de ' . $nome;
        $mail->Body    = "<h1>Feedback de {$nome}</h1><p>{$feedback}</p>";
        $mail->AltBody = "Feedback de {$nome}\n\n{$feedback}";

        $mail->send();
        $response = '<p style="color: green;">Formulário enviado com sucesso!</p>';
    } catch (Exception $e) {
        $response = '<p style="color: red;">Erro ao enviar o e-mail: ' . $mail->ErrorInfo . '</p>';
    }
}
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quero Pizza</title>
    <link rel="stylesheet" href="/css/template.css">
    <link rel="icon" href="/img/icon.png">
    <link href="https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap" rel="stylesheet">
</head>
<body>
<div class="content-wrapper">
    <header class="header-container">
        <div class="header-content">
            <nav>
                <img src="/img/icon.png" alt="Quero Pizza Icone">
                <ul><a href="index.html" class="texto-branco">Home</a></ul>
                <ul><a href="#cardapio" class="texto-branco">Cardápio</a></ul>
                <ul><a href="#casa" class="texto-branco">Nossa Casa</a></ul>
                <ul><a href="https://www.ifood.com.br/delivery/osasco-sp/quero-pizza-veloso/f206325b-9024-447e-b399-64589dc29d93" class="texto-branco">Delivery</a></ul>
            </nav>
        </div>
    </header>
    <main class="main">
        <div class="main-content">
            <h2 class="texto-branco">Fale Conosco</h2>
            <hr>
            <form action="" method="post" class="texto-branco">
                <label for="nome">Digite seu Nome</label>
                <input type="text" name="nome" id="nome" placeholder="Seu nome..." required>
                <label for="email">Digite seu Email</label>
                <input type="email" name="email" id="email" placeholder="exemplo@gmail.com" required>
                <label for="feedback">Digite seu Feedback</label>
                <textarea id="feedback" name="feedback" rows="5" required></textarea>
                <div style="margin-top: 20px; text-align: center;">
                    <button type="submit" class="order-div-confirm texto-branco">Confirmar</button>
                    <?= $response; ?>
                </div>
            </form>
        </div>
    </main>
    <footer class="footer-container">
        <div class="footer-content texto-branco">
            <p>©2024 Quero Pizza. - Todos os direitos reservados</p>
            <p>www.queropizza.com.br</p>
        </div>
    </footer>
</div>
</body>
</html>
