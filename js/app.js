document.addEventListener('DOMContentLoaded', () => {
  const root = document.documentElement;
  const deck = document.getElementById("deck");
  const coverPage = document.getElementById("coverPage");
  const aspectEditors = document.getElementById("aspectEditors");
  const aspectPreview = document.getElementById("aspectPreview");

  const fields = [
    ["reportTitle", "previewReportTitle"],
    ["reportDate", "previewReportDate"],
    ["reportNumber", "previewReportNumber"],
    ["processes", "previewProcesses"],
    ["directors", "previewDirectors"],
    ["objective", "previewObjective"],
    ["scope", "previewScope"],
    ["visits", "previewVisits"],
    ["amount", "previewAmount"],
    ["novelty", "previewNovelty"],
    ["intermediateTitleInput", "previewIntermediateTitle"],
    ["alertTitle", "previewAlertTitle"],
    ["alertSubtitle", "previewAlertSubtitle"],
    ["alertAmount", "previewAlertAmount"],
    ["userRole", "previewUserRole"],
    ["userName", "previewUserName"],
    ["userId", "previewUserId"],
    ["b3PuntoNum", "prevB3PuntoNum"],
    ["b3PuntoName", "prevB3PuntoName"],
    ["b3UserRole", "prevB3UserRole"],
    ["b3UserName", "prevB3UserName"],
    ["b3UserId", "prevB3UserId"],
    ["b3FaltanteNum", "prevB3FaltanteNum"],
    ["b3FaltanteType", "prevB3FaltanteType"],
    ["b3Valor", "prevB3Valor"]
  ];

  const themes = {
    "theme-boardroom": {
      bg: "#f8fafc", accent: "#1d4ed8", accent2: "#0f766e", soft: "#dbeafe",
      kpiBgStart: "#0b4290", kpiBgEnd: "#052b68", kpiBorder: "#050075",
      kpiNumberBg: "#ffe169", kpiNumberText: "#ffffff", kpiTitle: "#06135f"
    },
    "theme-mineral": {
      bg: "#f4f7f6", accent: "#31572c", accent2: "#4f6f7f", soft: "#d8e7df",
      kpiBgStart: "#31572c", kpiBgEnd: "#1f3d25", kpiBorder: "#17211f",
      kpiNumberBg: "#d9ed92", kpiNumberText: "#17211f", kpiTitle: "#17211f"
    },
    "theme-copper": {
      bg: "#fbfaf8", accent: "#8a3ffc", accent2: "#b45309", soft: "#eee7ff",
      kpiBgStart: "#8a3ffc", kpiBgEnd: "#4c1d95", kpiBorder: "#2e1065",
      kpiNumberBg: "#fbbf24", kpiNumberText: "#ffffff", kpiTitle: "#2e1065"
    }
  };

  let aspects = [
    { title: "Cumplimiento documental" },
    { title: "Gestión operativa" },
    { title: "Control financiero" },
    { title: "Riesgos y novedades" }
  ];

  const samples = {
    reportTitle: "Informe Auditoria Operativa",
    reportDate: "28 de agosto de 2026",
    reportNumber: "No. INFORME: OP-2026-020",
    processes: "Comercial,\nAdministrativo,\nJuridico,\nGestión Humana,\nCumplimiento\nTIC",
    directors: "Camilo Rodríguez, Paola Villamizar, Francisco Melendéz, Janeth Martínez, Katty Martínez, Maira Echeverry, Luis Osorio.",
    objective: "Presentar los resultados semanales de la evaluación realizada, resaltando avances, novedades y asuntos que requieren gestión directiva.",
    scope: "La revisión comprende las visitas, soportes, procesos y novedades identificadas durante la semana reportada.",
    visits: "8 visitas",
    amount: "$ 1.250 millones",
    novelty: "Se evidenció oportunidad de mejora en la consistencia de los soportes y en la documentación de cierres parciales.",
    intermediateTitleInput: "Novedades de efectivo. R. Alto. P-Comercial",
    alertTitle: "NOVEDAD IDENTIFICADA",
    alertSubtitle: "Sobrante por",
    alertAmount: "$11.599.470",
    userRole: "ASESORA DE COMISIÓN",
    userName: "MARIA ALEJANDRA SUESCUN",
    userId: "CC 1004826055"
  };

  function setReportVar(name, value) {
    deck.style.setProperty(name, value);
    document.querySelectorAll(".page").forEach(page => page.style.setProperty(name, value));
  }

  function hexToRgb(hex) {
    hex = (hex || "#000000").replace("#", "");
    if (hex.length === 3) hex = hex.split("").map(c => c + c).join("");
    const num = parseInt(hex, 16) || 0;
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }

  function mixWithTransparent(hex, percent) {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r},${g},${b},${(percent / 100).toFixed(3)})`;
  }

  function mixWithWhite(hex, percent) {
    const { r, g, b } = hexToRgb(hex);
    const p = percent / 100;
    const m = v => Math.round(v * p + 255 * (1 - p));
    return `rgb(${m(r)},${m(g)},${m(b)})`;
  }

  function mixTwoColors(hexA, percent, hexB) {
    const a = hexToRgb(hexA), b = hexToRgb(hexB);
    const p = percent / 100;
    const m = (x, y) => Math.round(x * p + y * (1 - p));
    return `rgb(${m(a.r, b.r)},${m(a.g, b.g)},${m(a.b, b.b)})`;
  }

  function updateMixedColors() {
    const accent = document.getElementById("accent").value;
    const accent2 = document.getElementById("accent2").value;
    const pageBg = document.getElementById("pageBg").value;
    const soft = document.getElementById("soft").value;
    const kpiNumberBg = document.getElementById("kpiNumberBg").value;
    const muted = "#637083";
    const pageEl = document.querySelector(".page");
    const pageInk = pageEl ? (getComputedStyle(pageEl).getPropertyValue("--page-ink").trim() || "#111827") : "#111827";

    setReportVar("--mix-accent-18-transparent", mixWithTransparent(accent, 18));
    setReportVar("--mix-accent-16-transparent", mixWithTransparent(accent, 16));
    setReportVar("--mix-accent-34-transparent", mixWithTransparent(accent, 34));
    setReportVar("--mix-accent2-24-transparent", mixWithTransparent(accent2, 24));
    setReportVar("--mix-accent2-30-transparent", mixWithTransparent(accent2, 30));
    setReportVar("--mix-pagebg-92-white", mixWithWhite(pageBg, 92));
    setReportVar("--mix-pageink-78-muted", mixTwoColors(pageInk, 78, muted));
    setReportVar("--mix-pageink-72-muted", mixTwoColors(pageInk, 72, muted));
    setReportVar("--mix-pageink-55-transparent", mixWithTransparent(pageInk, 55));
    setReportVar("--mix-soft-34-white", mixWithWhite(soft, 34));
    setReportVar("--mix-soft-36-white", mixWithWhite(soft, 36));
    setReportVar("--mix-soft-38-white", mixWithWhite(soft, 38));
    setReportVar("--mix-soft-45-white", mixWithWhite(soft, 45));
    setReportVar("--mix-soft-48-white", mixWithWhite(soft, 48));
    setReportVar("--mix-soft-72-white", mixWithWhite(soft, 72));
    setReportVar("--mix-soft-80-white", mixWithWhite(soft, 80));
    setReportVar("--mix-kpinum-82-white", mixWithWhite(kpiNumberBg, 82));
  }

  function value(id) {
    const el = document.getElementById(id);
    return el ? (el.value.trim() || "Pendiente por completar") : "";
  }

  function syncField(inputId, previewId) {
    const previewEl = document.getElementById(previewId);
    if (!previewEl) return;
    
    const val = document.getElementById(inputId)?.value || "";

    if (inputId === "directors") {
      previewEl.innerHTML = "";
      
      // Dividimos por saltos de línea O por comas seguidas de espacio para limpiar cualquier formato previo
      const lines = val.split(/\n|, /).map(l => l.trim()).filter(l => l.length > 0);
      
      if (lines.length === 0) {
        previewEl.textContent = "Pendiente por completar";
        return;
      }

      lines.forEach(line => {
        const span = document.createElement("span");
        span.style.display = "block";
        span.style.marginBottom = "2px";
        span.textContent = line;
        previewEl.appendChild(span);
      });
    } else {
      previewEl.textContent = val.trim() || "Pendiente por completar";
    }
  }

  function syncAll() {
    fields.forEach(([inputId, previewId]) => syncField(inputId, previewId));
    renderAspects();
  }

  function setTheme(themeName) {
    deck.className = "deck " + themeName;
    const theme = themes[themeName];
    setReportVar("--page-bg", theme.bg);
    setReportVar("--accent", theme.accent);
    setReportVar("--accent-2", theme.accent2);
    setReportVar("--soft", theme.soft);
    setReportVar("--kpi-bg-start", theme.kpiBgStart);
    setReportVar("--kpi-bg-end", theme.kpiBgEnd);
    setReportVar("--kpi-border", theme.kpiBorder);
    setReportVar("--kpi-number-bg", theme.kpiNumberBg);
    setReportVar("--kpi-number-text", theme.kpiNumberText);
    setReportVar("--kpi-title", theme.kpiTitle);

    document.getElementById("pageBg").value = theme.bg;
    document.getElementById("accent").value = theme.accent;
    document.getElementById("accent2").value = theme.accent2;
    document.getElementById("soft").value = theme.soft;
    document.getElementById("kpiBgStart").value = theme.kpiBgStart;
    document.getElementById("kpiBgEnd").value = theme.kpiBgEnd;
    document.getElementById("kpiBorder").value = theme.kpiBorder;
    document.getElementById("kpiNumberBg").value = theme.kpiNumberBg;
    document.getElementById("kpiNumberText").value = theme.kpiNumberText;
    document.getElementById("kpiTitleColor").value = theme.kpiTitle;
    
    updateMixedColors();
  }

  function escapeHtml(text) {
    return text.replace(/[&<>"']/g, char => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[char]));
  }

  function renderAspectEditors() {
    aspectEditors.innerHTML = "";
    aspects.forEach((aspect, index) => {
      const wrapper = document.createElement("div");
      wrapper.className = "aspect-editor";
      wrapper.innerHTML = `
        <div class="field"><label>Aspecto ${index + 1}</label><input value="${escapeHtml(aspect.title)}" data-aspect-title="${index}"></div>
        <div class="aspect-actions"><button class="btn btn-danger" type="button" data-remove-aspect="${index}">Eliminar</button></div>
      `;
      aspectEditors.appendChild(wrapper);
    });
  }

  function renderAspects() {
    aspectPreview.innerHTML = "";
    aspects.forEach(aspect => {
      const card = document.createElement("div");
      const title = document.createElement("h3");
      card.className = "aspect-card";
      title.textContent = aspect.title.trim() || "Aspecto pendiente";
      card.append(title);
      aspectPreview.appendChild(card);
    });
  }

  // Dejar el logo fijo habilitado por defecto
  function initLogo() {
    const logo = document.getElementById("previewLogo");
    if (logo) {
      coverPage.classList.add("has-logo");
    }
  }

  // --- Event Listeners ---
  fields.forEach(([inputId, previewId]) => {
    const el = document.getElementById(inputId);
    if(el) el.addEventListener("input", () => syncField(inputId, previewId));
  });

  document.getElementById("theme").addEventListener("change", event => setTheme(event.target.value));
  document.getElementById("pageBg").addEventListener("input", event => { setReportVar("--page-bg", event.target.value); updateMixedColors(); });
  document.getElementById("accent").addEventListener("input", event => { setReportVar("--accent", event.target.value); updateMixedColors(); });
  document.getElementById("accent2").addEventListener("input", event => { setReportVar("--accent-2", event.target.value); updateMixedColors(); });
  document.getElementById("soft").addEventListener("input", event => { setReportVar("--soft", event.target.value); updateMixedColors(); });  
  document.getElementById("kpiBgStart").addEventListener("input", event => setReportVar("--kpi-bg-start", event.target.value));
  document.getElementById("kpiBgEnd").addEventListener("input", event => setReportVar("--kpi-bg-end", event.target.value));
  document.getElementById("kpiBorder").addEventListener("input", event => setReportVar("--kpi-border", event.target.value));
  document.getElementById("kpiNumberBg").addEventListener("input", event => { setReportVar("--kpi-number-bg", event.target.value); updateMixedColors(); });
  document.getElementById("kpiNumberText").addEventListener("input", event => setReportVar("--kpi-number-text", event.target.value));
  document.getElementById("kpiTitleColor").addEventListener("input", event => setReportVar("--kpi-title", event.target.value));

document.getElementById("fontChoice").addEventListener("change", event => {
  const selectedFont = event.target.value;
  // Aplica la fuente a la variable global y de forma directa al contenedor y páginas
  setReportVar("--report-font", selectedFont);
  document.querySelectorAll(".page, .deck, .app").forEach(el => {
    el.style.fontFamily = selectedFont;
  });
});

  aspectEditors.addEventListener("input", event => {
    const titleIndex = event.target.dataset.aspectTitle;
    if (titleIndex !== undefined) aspects[Number(titleIndex)].title = event.target.value;
    renderAspects();
  });

  aspectEditors.addEventListener("click", event => {
    const index = event.target.dataset.removeAspect;
    if (index === undefined) return;
    aspects.splice(Number(index), 1);
    renderAspectEditors();
    renderAspects();
  });

  document.getElementById("addAspect").addEventListener("click", () => {
    aspects.push({ title: "Nuevo aspecto" });
    renderAspectEditors();
    renderAspects();
  });

  document.getElementById("sample").addEventListener("click", () => {
    Object.entries(samples).forEach(([id, text]) => {
      const el = document.getElementById(id);
      if(el) el.value = text;
    });
    aspects = [
      { title: "Cumplimiento documental" },
      { title: "Gestión operativa" },
      { title: "Control financiero" },
      { title: "Riesgos y novedades" }
    ];
    renderAspectEditors();
    syncAll();
  });

  // --- PDF GENERATION ---
  document.getElementById("print").addEventListener("click", async () => {
    syncAll();

    const button = document.getElementById("print");
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "Generando PDF...";

    try {
      if (typeof html2canvas === "undefined" || !window.jspdf) {
        throw new Error("No se pudieron cargar las librerías de PDF.");
      }

      if (document.fonts && document.fonts.ready) {
        try { await document.fonts.ready; } catch (e) {}
      }

      const images = [...document.images];
      await Promise.all(images.map(img => {
        if (img.complete) return Promise.resolve();
        return new Promise(resolve => {
          img.addEventListener("load", resolve, { once: true });
          img.addEventListener("error", resolve, { once: true });
        });
      }));

      await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

      const { jsPDF } = window.jspdf;
      const pages = [...document.querySelectorAll(".page")];

      const pdfWidth = 297;
      const pdfHeight = 210;

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
        compress: true
      });

      for (let i = 0; i < pages.length; i++) {
        const page = pages[i];

        const canvas = await html2canvas(page, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          backgroundColor: null,
          logging: false,
          imageTimeout: 15000,
          width: 1122,
          height: 794
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.98);

        if (i > 0) pdf.addPage("a4", "landscape");

        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight, undefined, "FAST");
      }

      const title = (document.getElementById("reportTitle").value || "Informe ejecutivo semanal")
        .trim()
        .replace(/[<>:"/\\|?*\x00-\x1F]/g, " ")
        .replace(/\s+/g, " ")
        .slice(0, 90);

      pdf.save(title + ".pdf");
    } catch (error) {
      console.error(error);
      alert("No fue posible generar el PDF.\n\n" + error.message);
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });

  function setPageBackgroundStyle(bgClass) {
    const pages = document.querySelectorAll(".page");
    pages.forEach(page => {
      page.classList.remove(
        
        "bg-swiss-diagonal", 
        "bg-asymmetric-bars", 
        "bg-modern", 
        "bg-editorial", 
        "bg-dynamic"
      );
      if (bgClass) page.classList.add(bgClass);
    });
  }

  const bgStyleSelect = document.getElementById("pageBackgroundStyle");
  if (bgStyleSelect) {
    bgStyleSelect.addEventListener("change", event => {
      setPageBackgroundStyle(event.target.value);
    });
  }

  function applyCustomBackground(src) {
    if (!src) return;
    const pages = document.querySelectorAll(".page");
    pages.forEach(page => {
      page.style.backgroundImage = `url(${src})`;
    });
    
    if (bgStyleSelect) {
      bgStyleSelect.disabled = true;
      setPageBackgroundStyle(""); 
    }
  }

  const bgImageUpload = document.getElementById("bgImageUpload");
  if (bgImageUpload) {
    bgImageUpload.addEventListener("change", event => {
      const file = event.target.files && event.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => applyCustomBackground(reader.result);
      reader.readAsDataURL(file);
    });
  }

  setTheme("theme-boardroom");
  initLogo();
  renderAspectEditors();
  syncAll();

  // --- LÓGICA DE LA TABLA DINÁMICA (Página 3) ---
  let tableData = [
    ["Concepto", "Descripción", "Valor Faltante"],
    ["Raspas", "Faltante físico en inventario", "$155.000"],
    ["Efectivo", "Descuadre de caja menor", "$0"]
  ];

  const tableSidebarGrid = document.getElementById("tableSidebarGrid");
  const previewTable = document.getElementById("previewTable");

  function renderTableData() {
    // 1. Renderizar inputs en el Sidebar
    tableSidebarGrid.style.gridTemplateColumns = `repeat(${tableData[0].length}, 1fr)`;
    tableSidebarGrid.innerHTML = "";

    tableData.forEach((row, rowIndex) => {
      row.forEach((cellData, colIndex) => {
        const input = document.createElement("input");
        input.value = cellData;
        input.style.padding = "6px";
        input.style.fontSize = "12px";
        
        // Colores para diferenciar el encabezado (Fila 0)
        if (rowIndex === 0) {
          input.style.background = "var(--soft)";
          input.style.fontWeight = "bold";
        }

        input.addEventListener("input", (e) => {
          tableData[rowIndex][colIndex] = e.target.value;
          renderTablePreviewOnly(); // Actualizar preview sin redibujar inputs
        });
        tableSidebarGrid.appendChild(input);
      });
    });

    renderTablePreviewOnly();
  }

  function renderTablePreviewOnly() {
    previewTable.innerHTML = "";
    tableData.forEach((row, rowIndex) => {
      const tr = document.createElement("tr");
      row.forEach((cellData) => {
        const cell = document.createElement(rowIndex === 0 ? "th" : "td");
        cell.textContent = cellData;
        tr.appendChild(cell);
      });
      previewTable.appendChild(tr);
    });
  }

  // Botones de control de Tabla
  document.getElementById("addColBtn").addEventListener("click", () => {
    tableData.forEach(row => row.push("Dato"));
    renderTableData();
  });

  document.getElementById("remColBtn").addEventListener("click", () => {
    if (tableData[0].length > 1) {
      tableData.forEach(row => row.pop());
      renderTableData();
    }
  });

  document.getElementById("addRowBtn").addEventListener("click", () => {
    const newRow = new Array(tableData[0].length).fill("Dato");
    tableData.push(newRow);
    renderTableData();
  });

  document.getElementById("remRowBtn").addEventListener("click", () => {
    if (tableData.length > 1) {
      tableData.pop();
      renderTableData();
    }
  });

  // Inicializar la tabla al cargar
  renderTableData();

// --- LÓGICA DE LA TABLA DE EVIDENCIAS (Página 4) ---
  let evidenceData = [
    { title: "Sobrante de caja", desc: "Se evidencia billete de 50.000 adicional fuera de la gaveta principal.", imgUrl: "" }
  ];

  const evidenceSidebarGrid = document.getElementById("evidenceSidebarGrid");
  const evidenceTableBody = document.getElementById("evidenceTableBody");

  function renderEvidenceData() {
    evidenceSidebarGrid.innerHTML = "";
    
    evidenceData.forEach((row, index) => {
      // Crear contenedor de la fila en el sidebar
      const editor = document.createElement("div");
      editor.className = "evidence-row-editor";
      
      // Botón Eliminar
      const removeBtn = document.createElement("button");
      removeBtn.className = "remove-btn";
      removeBtn.textContent = "Eliminar";
      removeBtn.onclick = () => { 
        evidenceData.splice(index, 1); 
        renderEvidenceData(); 
      };

      // Input: Hallazgo
      const titleDiv = document.createElement("div");
      titleDiv.className = "field";
      titleDiv.innerHTML = `<label>Hallazgo / Ítem</label>`;
      const titleInput = document.createElement("input");
      titleInput.value = row.title;
      titleInput.oninput = (e) => { row.title = e.target.value; renderEvidencePreview(); };
      titleDiv.appendChild(titleInput);

      // Input: Descripción
      const descDiv = document.createElement("div");
      descDiv.className = "field";
      descDiv.innerHTML = `<label>Descripción</label>`;
      const descInput = document.createElement("textarea");
      descInput.value = row.desc;
      descInput.style.minHeight = "60px";
      descInput.oninput = (e) => { row.desc = e.target.value; renderEvidencePreview(); };
      descDiv.appendChild(descInput);

      // Input: Imagen
      const imgDiv = document.createElement("div");
      imgDiv.className = "field";
      imgDiv.innerHTML = `<label>Cargar Imagen</label>`;
      const imgInput = document.createElement("input");
      imgInput.type = "file";
      imgInput.accept = "image/*";
      imgInput.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (ev) => {
            row.imgUrl = ev.target.result; // Convierte la imagen a Base64
            renderEvidencePreview();
          };
          reader.readAsDataURL(file);
        }
      };
      imgDiv.appendChild(imgInput);

      editor.append(removeBtn, titleDiv, descDiv, imgDiv);
      evidenceSidebarGrid.appendChild(editor);
    });

    renderEvidencePreview();
  }

  function renderEvidencePreview() {
    evidenceTableBody.innerHTML = "";
    
    evidenceData.forEach(row => {
      const tr = document.createElement("tr");
      
      // Col 1: Texto
      const td1 = document.createElement("td");
      td1.textContent = row.title;
      
      // Col 2: Texto
      const td2 = document.createElement("td");
      td2.textContent = row.desc;
      
      // Col 3: Imagen
      const td3 = document.createElement("td");
      td3.style.verticalAlign = "middle";
      if (row.imgUrl) {
        const img = document.createElement("img");
        img.src = row.imgUrl;
        img.className = "evidence-img-preview";
        td3.appendChild(img);
      } else {
        td3.innerHTML = `<div style="text-align: center; color: #94a3b8; font-style: italic; padding: 20px;">Sin imagen cargada</div>`;
      }
      
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      evidenceTableBody.appendChild(tr);
    });
  }

  document.getElementById("addEvidenceRowBtn").addEventListener("click", () => {
    evidenceData.push({ title: "Nuevo hallazgo", desc: "", imgUrl: "" });
    renderEvidenceData();
  });

  // Iniciar la tabla de evidencias
  renderEvidenceData();
  
});