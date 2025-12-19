(() => {
  // ===== Settings =====
  const OWNER = "TCDASHOP";
  const REPO  = "TCDA-FAQ";

  // ===== DOM =====
  const yearEl = document.getElementById("year");
  const lastUpdatedEl = document.getElementById("lastUpdated");
  const faqRoot = document.getElementById("faqRoot");
  const emptyState = document.getElementById("emptyState");

  const btnJP = document.getElementById("btn-jp");
  const btnEN = document.getElementById("btn-en");
  const searchInput = document.getElementById("faqSearch");
  const clearBtn = document.getElementById("clearSearch");

  // ===== i18n (UI texts) =====
  const UI = {
    tap: { jp: "質問（Q）をタップすると回答（A）が表示されます。重要項目は最初から開いています。", en: "Tap a question to reveal the answer. Important items are opened by default." },
    hint1: { jp: "検索は表示中の言語のみ対象です。", en: "Search applies only to the currently displayed language." },
    hint2: { jp: "例：customs / returns / payment", en: "Examples: customs / returns / payment" },
    empty: { jp: "該当するFAQが見つかりませんでした。別のキーワードで試してください。", en: "No matching FAQs found. Try another keyword." },
    updatedLabel: { jp: "更新日", en: "Last updated" },
    clear: { jp: "クリア", en: "Clear" },
    placeholder: { jp: "キーワードで検索（例：関税 / 返品 / 支払い）", en: "Search keywords (e.g., customs / returns / payment)" }
  };

  // ===== FAQ Data =====
  // tagsは表示言語に合わせて自動翻訳（tagKeyで管理）
  const TAGS = {
    important: { jp: "重要", en: "Important" },
    returns:   { jp: "返品", en: "Returns" },
    support:   { jp: "サポート", en: "Support" },
    size:      { jp: "サイズ", en: "Size" },
    payment:   { jp: "支払い", en: "Payment" },
    shipping:  { jp: "配送", en: "Shipping" },
    customs:   { jp: "関税", en: "Customs" },
    price:     { jp: "価格", en: "Pricing" },
    care:      { jp: "お手入れ", en: "Care" },
    images:    { jp: "商品画像", en: "Product images" }
  };

  const FAQ = [
    {
      sectionKey: "returns",
      sectionTitle: { jp: "RETURNS & EXCHANGES", en: "RETURNS & EXCHANGES" },
      items: [
        {
          id: "return_exchange",
          important: true,
          q: { jp: "返品・交換はできますか？", en: "Can I return or exchange my item?" },
          a: {
            jp:
              "<b>A.</b> 当ショップの商品はオンデマンド生産（受注生産）のため、<b>お客様都合による返品・交換はお受けしておりません</b>。<br>" +
              "ただし、商品に初期不良があった場合や当店の不備による誤配送の場合は、状況確認のうえ対応いたします。商品到着後、できるだけ早くお問い合わせください。" +
              '<div class="note">※ law（特定商取引法に基づく表記）と同趣旨です。</div>',
            en:
              "<b>A.</b> Because items are made to order, we <b>do not accept returns or exchanges based on customer preference</b>.<br>" +
              "If your item is defective or incorrectly delivered due to our error, we will assist after confirming the situation. Please contact us as soon as possible after receiving the item." +
              '<div class="note">Same intent as the Act on Specified Commercial Transactions page.</div>'
          },
          tagKeys: ["important", "returns"]
        },
        {
          id: "defective_wrong",
          important: false,
          q: { jp: "初期不良・誤配送の場合は？", en: "What if my item is defective or incorrect?" },
          a: {
            jp:
              "<b>A.</b> 商品に不備（初期不良）がある場合、または当店都合の誤配送の場合は、状況確認のうえ対応いたします。<br>" +
              "お届け後できるだけ早くご連絡ください（該当箇所の写真があるとスムーズです）。",
            en:
              "<b>A.</b> If your item is defective or incorrect due to our error, we will assist after confirming the situation.<br>" +
              "Please contact us as soon as possible (photos help speed things up)."
          },
          tagKeys: ["support"]
        },
        {
          id: "size_not_fit",
          important: false,
          q: { jp: "サイズが合わなかった場合は？", en: "Can I exchange for a different size?" },
          a: {
            jp:
              "<b>A.</b> 受注生産のため、原則として<b>サイズ都合での返品・交換はお受けできません</b>。<br>" +
              "ご購入前にサイズ表をご確認ください。迷った場合は「いつも通り / ゆったりなら1サイズ上」も目安です。",
            en:
              "<b>A.</b> Because items are made to order, we generally <b>cannot accept size-based exchanges or returns</b>.<br>" +
              "Please check the size chart before purchasing. If you prefer a relaxed fit, consider sizing up."
          },
          tagKeys: ["size"]
        }
      ]
    },

    {
      sectionKey: "payment",
      sectionTitle: { jp: "PAYMENT METHODS", en: "PAYMENT METHODS" },
      items: [
        {
          id: "payment_methods",
          important: true,
          q: { jp: "利用できる支払い方法は？（代金の支払方法・時期）", en: "What payment methods are accepted? (Payment method & timing)" },
          a: {
            jp:
              "<b>A.</b> お支払い方法は、<b>BASEが提供する決済方法</b>に準拠します。<br>" +
              "クレジットカード、PayPal、その他購入画面に表示される決済方法をご利用いただけます。<br>" +
              "お支払い時期は、ご注文確定時となります。" +
              '<div class="note">※ law（About Payment Billing Date）と同趣旨です。</div>',
            en:
              "<b>A.</b> Payment methods follow those provided by <b>BASE</b>.<br>" +
              "Options include credit cards, PayPal, and other methods shown at checkout.<br>" +
              "Payment is required when your order is confirmed." +
              '<div class="note">Same intent as “About Payment Billing Date”.</div>'
          },
          tagKeys: ["important", "payment"]
        }
      ]
    },

    {
      sectionKey: "shipping",
      sectionTitle: { jp: "SHIPPING & DELIVERY", en: "SHIPPING & DELIVERY" },
      items: [
        {
          id: "delivery_timing",
          important: true,
          q: { jp: "商品の発送・お届け時期は？", en: "When will my order be produced and delivered?" },
          a: {
            jp:
              "<b>A.</b> 当ショップの商品はすべてオンデマンド生産（受注生産）です。ご注文確定後、制作期間を経て発送されます。<br>" +
              "制作期間および配送日数は商品やお届け先の国・地域により異なります。詳しい目安は各商品ページをご確認ください。" +
              '<div class="note">※ law（Shipping Date）と同趣旨です。</div>',
            en:
              "<b>A.</b> All items are made to order. Production starts after your order is confirmed, then the item ships once completed.<br>" +
              "Production and shipping times vary by product and destination. Please refer to each product page for estimates." +
              '<div class="note">Same intent as “Shipping Date”.</div>'
          },
          tagKeys: ["important", "shipping"]
        },
        {
          id: "tracking",
          important: false,
          q: { jp: "追跡番号（トラッキング）はありますか？", en: "Will I get a tracking number?" },
          a: {
            jp: "<b>A.</b> 発送後、追跡番号が発行される場合は通知または注文情報からご確認いただけます（配送方法・国により異なる場合があります）。",
            en: "<b>A.</b> If a tracking number is issued, you can check it via notifications or order details (depends on carrier and destination)."
          },
          tagKeys: ["shipping"]
        }
      ]
    },

    {
      sectionKey: "intl",
      sectionTitle: { jp: "INTERNATIONAL SHIPPING", en: "INTERNATIONAL SHIPPING" },
      items: [
        {
          id: "customs",
          important: true,
          q: { jp: "関税・輸入税はかかりますか？", en: "Will I need to pay customs duties or import taxes?" },
          a: {
            jp:
              "<b>A.</b> お届け先の国・地域によっては、関税・輸入税・通関手数料が発生する場合があります（原則：購入者負担）。<br>" +
              "税額や条件は各国の規定により異なります。",
            en:
              "<b>A.</b> Depending on your country, customs duties, import taxes, or clearance fees may apply (generally paid by the buyer).<br>" +
              "Amounts and rules vary by country."
          },
          tagKeys: ["important", "customs"]
        },
        {
          id: "international",
          important: false,
          q: { jp: "海外配送は可能ですか？", en: "Do you ship internationally?" },
          a: {
            jp: "<b>A.</b> はい、国・地域によって海外配送が可能です。チェックアウト画面に表示される配送可否をご確認ください。",
            en: "<b>A.</b> Yes, international shipping is available depending on the destination. Please check availability at checkout."
          },
          tagKeys: ["shipping"]
        }
      ]
    },

    {
      sectionKey: "pricing",
      sectionTitle: { jp: "PRODUCT & PRICING", en: "PRODUCT & PRICING" },
      items: [
        {
          id: "pricing",
          important: true,
          q: { jp: "販売価格について", en: "About pricing" },
          a: {
            jp:
              "<b>A.</b> 表示されている販売価格には、制作費・印刷費・素材費・運営コストが含まれています。<br>" +
              "受注生産のため、価格は予告なく変更される場合があります（為替・原材料価格等の影響）。",
            en:
              "<b>A.</b> Listed prices include production, printing, materials, and operational costs.<br>" +
              "As items are made to order, prices may change without notice due to exchange rates or material costs."
          },
          tagKeys: ["important", "price"]
        }
      ]
    },

    {
      sectionKey: "guide",
      sectionTitle: { jp: "SIZE / CARE (GUIDE)", en: "SIZE / CARE (GUIDE)" },
      items: [
        {
          id: "size_choose",
          important: false,
          q: { jp: "自分に合うサイズはどう選べばいいですか？", en: "How should I choose my size?" },
          a: {
            jp:
              "<b>A.</b> トップス・アウターは身幅（平置き）×2＝仕上がり胸囲を基準に、<br>" +
              "シューズは足長（cm）とアウトソール長を基準にお選びください。<br>" +
              "詳しくは各商品ページのSize Guideをご確認ください。",
            en:
              "<b>A.</b> For tops/outerwear: use (flat body width × 2) as the finished chest measurement.<br>" +
              "For shoes: use foot length (cm) and outsole length.<br>" +
              "Please check the Size Guide on each product page for details."
          },
          tagKeys: ["size"]
        },
        {
          id: "care",
          important: false,
          q: { jp: "お手入れ方法は？", en: "How should I care for items?" },
          a: {
            jp:
              "<b>A.</b> アパレルは裏返し・低温洗い・自然乾燥推奨。プリント面への高温アイロンや乾燥機は避けてください。<br>" +
              "シューズは柔らかい布やブラシで軽く汚れを落とし、陰干し推奨です。",
            en:
              "<b>A.</b> For apparel: wash inside out, use cold/low temperature, and air dry when possible. Avoid high-heat ironing on prints and tumble drying.<br>" +
              "For shoes: gently clean with a soft cloth/brush and dry in the shade."
          },
          tagKeys: ["care"]
        }
      ]
    },

    {
      sectionKey: "images",
      sectionTitle: { jp: "PRODUCT IMAGES", en: "PRODUCT IMAGES" },
      items: [
        {
          id: "ai_model_real",
          important: true,
          q: { jp: "商品画像のモデルは実在の人物ですか？", en: "Are the models in product images real people?" },
          a: {
            jp:
              "<b>A.</b> 商品画像に使用しているモデルは、AIによって生成されたイメージモデルを使用しています。<br>" +
              "実在の人物ではありません。",
            en:
              "<b>A.</b> We use AI-generated image models in product images.<br>" +
              "They are not real people."
          },
          tagKeys: ["important", "images"]
        },
        {
          id: "model_size_accuracy",
          important: false,
          q: { jp: "モデルの身長や着用サイズは正確な数値ですか？", en: "Are the model height and worn size exact measurements?" },
          a: {
            jp:
              "<b>A.</b> 画像内に記載しているモデル身長・着用サイズは、スタイリングの目安として設定した参考値です。<br>" +
              "実際の人物測定値を示すものではありません。",
            en:
              "<b>A.</b> The model height and worn size shown in images are reference values for styling.<br>" +
              "They do not represent measurements of a real person."
          },
          tagKeys: ["images"]
        },
        {
          id: "why_show_model_info",
          important: false,
          q: { jp: "なぜモデル身長や着用サイズを記載しているのですか？", en: "Why do you show model height and worn size?" },
          a: {
            jp:
              "<b>A.</b> 商品を着用した際のシルエットやサイズ感のイメージを掴んでいただくために記載しています。<br>" +
              "サイズ選びの最終判断は、必ず<strong>サイズガイド（実寸表）</strong>をご確認ください。",
            en:
              "<b>A.</b> We display them to help you imagine the silhouette and fit when worn.<br>" +
              "For final size decisions, please always check the <strong>Size Guide (actual measurements)</strong>."
          },
          tagKeys: ["images", "size"]
        },
        {
          id: "shoes_no_height",
          important: false,
          q: { jp: "シューズ画像にモデル身長が記載されていないのはなぜですか？", en: "Why don’t shoe images show model height?" },
          a: {
            jp:
              "<b>A.</b> シューズは身長ではなく、足の長さ・足幅・フィット感が重要なためです。<br>" +
              "そのため、画像には<strong>着用サイズ</strong>や<strong>サイズ感（標準／大きめ／小さめ）</strong>を記載しています。",
            en:
              "<b>A.</b> For shoes, height matters less than foot length/width and fit.<br>" +
              "So we show <strong>worn size</strong> and <strong>fit notes (true/large/small)</strong> instead."
          },
          tagKeys: ["images"]
        },
        {
          id: "image_vs_real",
          important: true,
          q: { jp: "画像と実際の商品で印象が異なることはありますか？", en: "Can the product look different from the images?" },
          a: {
            jp:
              "<b>A.</b> 撮影環境・表示デバイス・個人の体型差により、見え方に差が生じる場合があります。<br>" +
              "画像は参考イメージとしてご覧いただき、必ず実寸情報をご確認ください。",
            en:
              "<b>A.</b> Appearance may vary due to lighting, device displays, and individual body differences.<br>" +
              "Please treat images as references and always confirm actual measurements."
          },
          tagKeys: ["important", "images"]
        }
      ]
    }
  ];

  // ===== State =====
  let lang = "jp"; // "jp" or "en"

  // ===== Helpers =====
  const esc = (s) => String(s)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;").replace(/'/g,"&#39;");

  function setLang(next) {
    lang = next;

    // buttons
    btnJP.setAttribute("aria-pressed", lang === "jp" ? "true" : "false");
    btnEN.setAttribute("aria-pressed", lang === "en" ? "true" : "false");

    // html lang
    document.documentElement.lang = (lang === "jp") ? "ja" : "en";

    // translate small UI texts
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const key = el.getAttribute("data-i18n");
      if (UI[key]) el.textContent = UI[key][lang];
    });

    // search UI
    searchInput.placeholder = UI.placeholder[lang];
    clearBtn.textContent = UI.clear[lang];
    emptyState.textContent = UI.empty[lang];

    // re-render FAQs (fresh DOM -> highlightも検索も安定)
    renderFaq();

    // reset search
    clearSearch();
  }

  function buildTagHtml(tagKeys) {
    if (!Array.isArray(tagKeys) || tagKeys.length === 0) return "";
    return `<div class="tags">${
      tagKeys.map(k => `<span class="tag">${esc(TAGS[k]?.[lang] ?? k)}</span>`).join("")
    }</div>`;
  }

  function renderFaq() {
    const html = FAQ.map(sec => {
      const title = sec.sectionTitle[lang];
      const itemsHtml = sec.items.map(item => {
        const q = item.q[lang];
        const a = item.a[lang];
        const openAttr = item.important ? " open" : "";
        return `
          <details class="faq-item"${openAttr} data-faq-id="${esc(item.id)}">
            <summary>
              <div class="qleft">
                <div class="qbadge">Q</div>
                <div>
                  <div class="qtext">${q}</div>
                  ${buildTagHtml(item.tagKeys)}
                </div>
              </div>
              <div class="icon" aria-hidden="true">+</div>
            </summary>
            <div class="ans">${a}</div>
          </details>
        `;
      }).join("");

      return `
        <section class="section" aria-label="${esc(title)}">
          <h2 class="section-title">${esc(title)}</h2>
          ${itemsHtml}
        </section>
      `;
    }).join("");

    faqRoot.innerHTML = html;
  }

  // ===== Search (FIXED) =====
  // 以前の「検索できない」は、innerHTML再描画や言語切替で参照がズレる/文字列が壊れるのが典型原因。
  // ここは「毎回DOMを取り直して textContent で判定」するので確実に動きます。
  function normalize(s) {
    return (s || "").toLowerCase().replace(/\s+/g, " ").trim();
  }

  function clearHighlights() {
    // DOMをいじって戻すより、再レンダが最も安全
    renderFaq();
  }

  function highlight(el, term) {
    if (!term) return;
    const raw = el.innerHTML;
    const safe = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(safe, "ig");
    el.innerHTML = raw.replace(re, (m) => `<span class="match">${m}</span>`);
  }

  function filterFaq() {
    const q = normalize(searchInput.value);
    clearHighlights();

    const details = Array.from(document.querySelectorAll("details.faq-item"));
    if (!q) {
      details.forEach(d => d.classList.remove("hidden"));
      emptyState.style.display = "none";
      // important open を復元
      details.forEach(d => {
        const id = d.getAttribute("data-faq-id");
        const isImportant = FAQ.some(sec => sec.items.some(it => it.id === id && it.important));
        d.open = !!isImportant;
      });
      return;
    }

    let shown = 0;
    details.forEach(d => {
      const qEl = d.querySelector(".qtext");
      const aEl = d.querySelector(".ans");

      const hay = normalize((qEl?.textContent || "") + " " + (aEl?.textContent || ""));
      const ok = hay.includes(q);

      if (ok) {
        d.classList.remove("hidden");
        d.open = true;
        shown++;
        // highlight on HTML blocks (q and a)
        if (qEl) highlight(qEl, q);
        if (aEl) highlight(aEl, q);
      } else {
        d.classList.add("hidden");
        d.open = false;
      }
    });

    emptyState.style.display = (shown === 0) ? "block" : "none";
  }

  function clearSearch() {
    searchInput.value = "";
    filterFaq();
  }

  // ===== Last updated (GitHub API) =====
  async function setLastUpdated() {
    try {
      const url = `https://api.github.com/repos/${OWNER}/${REPO}/commits?path=index.html&per_page=1&page=1`;
      const res = await fetch(url, { headers: { "Accept": "application/vnd.github+json" } });
      if (!res.ok) throw new Error("GitHub API error");
      const data = await res.json();
      const iso = data?.[0]?.commit?.committer?.date || data?.[0]?.commit?.author?.date;
      if (!iso) throw new Error("No commit date");
      const dt = new Date(iso);
      const y = dt.getFullYear();
      const m = String(dt.getMonth()+1).padStart(2,"0");
      const d = String(dt.getDate()).padStart(2,"0");
      lastUpdatedEl.textContent = `${y}-${m}-${d}`;
    } catch {
      lastUpdatedEl.textContent = "—";
    }
  }

  // ===== Init =====
  yearEl.textContent = new Date().getFullYear();

  btnJP.addEventListener("click", () => setLang("jp"));
  btnEN.addEventListener("click", () => setLang("en"));
  clearBtn.addEventListener("click", clearSearch);
  searchInput.addEventListener("input", filterFaq);

  setLang("jp");
  setLastUpdated();
})();
