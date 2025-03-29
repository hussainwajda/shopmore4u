<?php
// Fetch product details from the server
$productId = $_GET['productId'] ?? null;
$product = null;
$error = null;

if ($productId) {
    try {
        // Assuming you have a function or a mechanism to make API calls
        $response = file_get_contents("https://server.shopmore4u.in/api/product/{$productId}");
        $product = json_decode($response, true);
    } catch (Exception $e) {
        $error = "Error fetching product";
    }
}

if ($error) {
    echo "<div>{$error}</div>";
    exit;
}

if (!$product) {
    echo "<div>Loading...</div>";
    exit;
}

// Meta tags for SEO
$title = htmlspecialchars($product['title'] ?? 'Product Page');
$description = htmlspecialchars($product['description'] ?? 'Product Description');
$imageUrl = htmlspecialchars($product['imageUrl'] ?? '');
$affiliateLink = htmlspecialchars($product['affiliateLink'] ?? '');
$price = htmlspecialchars($product['price'] ?? '');

// Output HTML
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?= $description ?>">
    <meta property="og:title" content="<?= $title ?>">
    <meta property="og:description" content="<?= $description ?>">
    <meta property="og:image" content="<?= $imageUrl ?>">
    <meta property="og:url" content="https://shopmore4u.in/product/<?= htmlspecialchars($productId) ?>">
    <title><?= $title ?></title>
    <link rel="stylesheet" href="productpage.css">
</head>
<body>

<div class="product-container">
    <div class="product-content">
        <h2 class="responsive-heading"><?= $title ?></h2>
        <div class="image-details">
            <img src="<?= $imageUrl ?>" alt="<?= $title ?>" class="product-image" />
            <div class="price-button-wrapper">
                <p class="product-price">Price: <?= $price ?></p>
                <h3 class="product-price">Click on this button to shop on Amazon <i class="fa fa-long-arrow-alt-down"></i></h3>
                <button onclick="window.location.href='<?= $affiliateLink ?>'" class="shop-now-button">
                    Shop Now
                </button>
            </div>
        </div>
        <p class="desc"><?= $description ?></p>
    </div>

    <!-- Include your AdSense component -->
    <?php include 'adSenseComponent.php'; ?>
</div>

<script src="https://kit.fontawesome.com/your-kit-id.js"></script>
</body>
</html>
