const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx6SmpFwcKnP-24Wnopw7SEV5dL4580d6hDbObEvex9GeYYBjHn6_UKvMsTJ6-b2XP9SQ/exec";

let items = [];

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('invoiceDate').valueAsDate = new Date();
    addItem(); 
    setupListeners();
});

function setupListeners() {
    const inputs = ['clientName', 'clientAddress', 'clientPhone', 'invoiceNumber', 'invoiceDate', 'taxPercentage'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('input', updatePreview);
    });

    document.getElementById('addItemBtn').addEventListener('click', addItem);
    document.getElementById('downloadPdfBtn').addEventListener('click', () => {
        await generatePDF();
        saveToSheet();
    });
    document.getElementById('whatsappBtn').addEventListener('click', sendWhatsApp);
}

function addItem() {
    const item = { id: Date.now(), desc: '', qty: 1, rate: 0 };
    items.push(item);
    renderInputs();
    updatePreview();
}

function removeItem(id) {
    items = items.filter(i => i.id !== id);
    renderInputs();
    updatePreview();
}

function updateItem(id, field, value) {
    const item = items.find(i => i.id === id);
    item[field] = value;
    updatePreview();
}

function renderInputs() {
    const container = document.getElementById('lineItemsContainer');
    container.innerHTML = '';
    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'line-item';
        div.innerHTML = `
            <input type="text" placeholder="Description of work" oninput="updateItem(${item.id}, 'desc', this.value)">
            <div class="line-item-row">
                <input type="number" placeholder="Qty" value="${item.qty}" oninput="updateItem(${item.id}, 'qty', this.value)">
                <input type="number" placeholder="Rate" value="${item.rate}" oninput="updateItem(${item.id}, 'rate', this.value)">
                <button class="btn btn-danger" onclick="removeItem(${item.id})">Remove</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function updatePreview() {
    // Basic Fields
    document.getElementById('p-clientName').innerText = document.getElementById('clientName').value || '---';
    document.getElementById('p-clientAddress').innerText = document.getElementById('clientAddress').value || '---';
    document.getElementById('p-clientPhone').innerText = document.getElementById('clientPhone').value || '---';
    document.getElementById('p-invoiceNumber').innerText = document.getElementById('invoiceNumber').value || '---';
    document.getElementById('p-date').innerText = document.getElementById('invoiceDate').value || '---';

    // Table
    const tbody = document.getElementById('p-lineItems');
    tbody.innerHTML = '';
    let subtotal = 0;

    items.forEach(item => {
        const amount = item.qty * item.rate;
        subtotal += amount;
        tbody.innerHTML += `<tr><td>${item.desc || '---'}</td><td>${item.qty}</td><td>₹${item.rate}</td><td>₹${amount.toFixed(2)}</td></tr>`;
    });

    // Totals
    const taxPct = parseFloat(document.getElementById('taxPercentage').value) || 0;
    const taxAmt = subtotal * (taxPct / 100);
    const total = subtotal + taxAmt;

    document.getElementById('p-subtotal').innerText = `₹${subtotal.toLocaleString('en-IN')}`;
    document.getElementById('p-taxRate').innerText = taxPct;
    document.getElementById('p-taxAmount').innerText = `₹${taxAmt.toLocaleString('en-IN')}`;
    document.getElementById('p-total').innerText = `₹${total.toLocaleString('en-IN')}`;
}

async function saveToSheet() {
    const data = {
        invoiceNumber: document.getElementById('invoiceNumber').value,
        date: document.getElementById('invoiceDate').value,
        customerName: document.getElementById('clientName').value,
        totalAmount: document.getElementById('p-total').innerText,
        whatsAppNumber: document.getElementById('clientPhone').value
    };
    fetch(GOOGLE_SCRIPT_URL, { method: 'POST', mode: 'no-cors', body: JSON.stringify(data) });
}

function sendWhatsApp() {
    const name = document.getElementById('clientName').value;
    const phone = document.getElementById('clientPhone').value;
    const total = document.getElementById('p-total').innerText;
    const msg = `Hello ${name}, this is SHRI VINAYAKA CONSTRUCTION. Your invoice for ${total} is ready. Please find the PDF attached. Thank you!`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`, '_blank');
}

async function generatePDF() {
    const { jsPDF } = window.jspdf;
    const canvas = await html2canvas(document.getElementById('invoicePreview'), { scale: 2 });
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
    pdf.save(`Invoice_${document.getElementById('invoiceNumber').value}.pdf`);
}
