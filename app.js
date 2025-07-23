async function generateCertificates() {
  const categoryInput = document.getElementById("category");
  const recipientInput = document.getElementById("recipient");
  const preview = document.getElementById("preview");

  const category = categoryInput?.value.trim();
  const recipient = recipientInput?.value.trim();

  if (!category || !recipient) {
    alert("Please enter both category and recipient name.");
    return;
  }

  preview.innerHTML = ""; // Clear old results

  const bgURL = "./assets/bg1.jpg"; // Or use your own background

  const bg = new Image();
  bg.crossOrigin = "anonymous"; // Important for image export
  bg.src = bgURL;

  bg.onload = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 600;

    const ctx = canvas.getContext("2d");

    // Draw background
    ctx.drawImage(bg, 0, 0, 800, 600);

    // Text styles
    ctx.font = "30px serif";
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";

    // Title
    ctx.fillText("Certificate of Completion", 400, 100);

    // Category
    ctx.font = "20px sans-serif";
    ctx.fillText(category, 400, 160);

    // Recipient name
    ctx.font = "28px bold";
    ctx.fillText(`Presented to: ${recipient}`, 400, 260);

    // Footer
    ctx.font = "16px italic";
    ctx.fillText("Issued by OpenCertify", 400, 500);

    // Add canvas to preview
    preview.appendChild(canvas);

    preview.style.textAlign = "center";
    preview.appendChild(canvas)

    // Add download button
    const downloadBtn = document.createElement("button");
    downloadBtn.textContent = "Download PNG";
    downloadBtn.classList.add("custom-button");
    downloadBtn.style.marginTop = "20px";
    downloadBtn.onclick = () => {
      const link = document.createElement("a");
      link.download = `${recipient.replace(/\s+/g, "_")}_certificate.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };

    preview.appendChild(downloadBtn);
  };

  bg.onerror = () => {
    alert("Failed to load certificate background image.");
  };
}
