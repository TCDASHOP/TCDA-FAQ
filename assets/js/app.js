(() => {
  // ====== Config ======
  const LAST_UPDATED = "2025-12-19"; // 手動で更新してOK（将来GitHub Actionsで自動化も可能）
  const IMPORTANT_OPEN_DEFAULT = true;

  // ====== Copy (UI texts) ======
  const UI = {
    ja: {
      sub: "質問（Q）をタップすると回答（A）が表示されます。重要項目は最初から開いています。",
      placeholder: "キーワードで検索（例：関税 / 返品 / 支払い）",
      clear: "クリア",
      hint1: "検索は表示中の言語のみ対象です。",
      hint2: "例：customs / returns / payment",
      empty: "該当するFAQが見つかりませんでした。別のキーワードで試してください。",
      lastUpdated: `Last updated: ${LAST_UPDATED}`,
      schemaName: "TCDA FAQ / GUIDE",
    },
    en: {
      sub: "Tap a question to reveal the answer. Important items are opened by default.",
      placeholder: "Search keywords (e.g., customs / returns / payment)",
      clear: "Clear",
      hint1: "Search applies only to the currently displayed language.",
      hint2: "Examples: customs / returns / payment",
      empty: "No matching FAQs found. Try another keyword.",
      lastUpdated: `Last updated: ${LAST_UPDATED}`,
      schemaName: "TCDA FAQ / GUIDE",
    }
  };

  // ====== FAQ Data ======
  // Tags: keep short + consistent
  const FAQ = [
    // RETURNS & EXCHANGES
    {
      section: { ja: "RETURNS & EXCHANGES", en: "RETURNS & EXCHANGES" },
      items: [
        {
          id: "return_exchange",
          important: true,
          tags: { ja: ["重要", "返品"], en: ["Important", "Returns"] },
          q: { ja: "返品・交換はできますか？", en: "Can I return or exchange my item?" },
          a: {
            ja: `当ショップの商品はオンデマンド生産（受注生産）のため、<b>お客様都合による返品・交換はお受けしておりません</b>。<br>
                 ただし、商品に初期不良があった場合や当店の不備による誤配送の場合は、状況確認のうえ対応いたします。商品到着後、できるだけ早くお問い合わせください。<div class="note">※ law（特定商取引法に基づく表記）と同趣旨です。</div>`,
            en: `Because items are made to order, we <b>do not accept returns or exchanges based on customer preference</b>.<br>
                 If your item is defective or incorrectly delivered due to our error, we will assist after confirming the situation. Please contact us as soon as possible after receiving the item.<div class="note">Same intent as the Act on Specified Commercial Transactions page.</div>`
          }
        },
        {
          id: "defective_wrong",
          important: false,
          tags: { ja: ["サポート"], en: ["Support"] },
          q: { ja: "初期不良・誤配送の場合は？", en: "What if my item is defective or incorrect?" },
          a: {
            ja: `商品に不備（初期不良）がある場合、または当店都合の誤配送の場合は、状況確認のうえ対応いたします。<br>
                 お届け後できるだけ早くご連絡ください（該当箇所の写真があるとスムーズです）。`,
            en: `If your item is defective or incorrect due to our error, we will assist after confirming the situation.<br>
                 Please contact us as soon as possible (photos help speed things up).`
          }
        },
        {
          id: "size_not_fit",
          important: false,
          tags: { ja: ["サイズ"], en: ["Size"] },
          q: { ja: "サイズが合わなかった場合は？", en: "Can I exchange for a different size?" },
          a: {
            ja: `受注生産のため、原則として<b>サイズ都合での返品・交換はお受けできません</b>。<br>
                 ご購入前にサイズ表をご確認ください。迷った場合は「いつも通り / ゆったりなら1サイズ上」も目安です。`,
            en: `Because items are made to order, we generally <b>cannot accept size-based exchanges or returns</b>.<br>
                 Please check the size chart before purchasing. If you prefer a relaxed fit, consider sizing up.`
          }
        }
      ]
    },

    // PAYMENT METHODS
    {
      section: { ja: "PAYMENT METHODS", en: "PAYMENT METHODS" },
      items: [
        {
          id: "payment_methods",
          important: true,
          tags: { ja: ["重要", "支払い"], en: ["Important", "Payment"] },
          q: { ja: "利用できる支払い方法は？（代金の支払方法・時期）", en: "What payment methods are accepted? (Payment method & timing)" },
          a: {
            ja: `お支払い方法は、<b>BASEが提供する決済方法</b>に準拠します。<br>
                 クレジットカード、PayPal、その他購入画面に表示される決済方法をご利用いただけます。<br>
                 お支払い時期は、ご注文確定時となります。<div class="note">※ law（About Payment Billing Date）と同趣旨です。</div>`,
            en: `Payment methods follow those provided by <b>BASE</b>.<br>
                 Options include credit cards, PayPal, and other methods shown at checkout.<br>
                 Payment is required when your order is confirmed.<div class="note">Same intent as “About Payment Billing Date”.</div>`
          }
        }
      ]
    },

    // SHIPPING & DELIVERY
    {
      section: { ja: "SHIPPING & DELIVERY", en: "SHIPPING & DELIVERY" },
      items: [
        {
          id: "delivery_timing",
          important: true,
          tags: { ja: ["重要", "配送"], en: ["Important", "Shipping"] },
          q: { ja: "商品の発送・お届け時期は？", en: "When will my order be produced and delivered?" },
          a: {
            ja: `当ショップの商品はすべてオンデマンド生産（受注生産）です。ご注文確定後、制作期間を経て発送されます。<br>
                 制作期間および配送日数は商品やお届け先の国・地域により異なります。詳しい目安は各商品ページをご確認ください。<div class="note">※ law（Shipping Date）と同趣旨です。</div>`,
            en: `All items are made to order. Production starts after your order is confirmed, then the item ships once completed.<br>
                 Production and shipping times vary by product and destination. Please refer to each product page for estimates.<div class="note">Same intent as “Shipping Date”.</div>`
          }
        },
        {
          id: "tracking",
          important: false,
          tags: { ja: ["配送"], en: ["Shipping"] },
          q: { ja: "追跡番号（トラッキング）はありますか？", en: "Will I get a tracking number?" },
          a: {
            ja: `発送後、追跡番号が発行される場合は通知または注文情報からご確認いただけます（配送方法・国により異なる場合があります）。`,
            en: `If a tracking number is issued, you can check it via notifications or order details (depends on carrier and destination).`
          }
        }
      ]
    },

    // INTERNATIONAL SHIPPING
    {
      section: { ja: "INTERNATIONAL SHIPPING", en: "INTERNATIONAL SHIPPING" },
      items: [
        {
          id: "customs",
          important: true,
          tags: { ja: ["重要", "関税"], en: ["Important", "Customs"] },
          q: { ja: "関税・輸入税はかかりますか？", en: "Will I need to pay customs duties or import taxes?" },
          a: {
            ja: `お届け先の国・地域によっては、関税・輸入税・通関手数料が発生する場合があります（原則：購入者負担）。<br>
                 税額や条件は各国の規定により異なります。`,
            en: `Depending on your country, customs duties, import taxes, or clearance fees may apply (generally paid by the buyer).<br>
                 Amounts and rules vary by country.`
          }
        },
        {
          id: "international",
          important: false,
          tags: { ja: ["配送"], en: ["Shipping"] },
          q: { ja: "海外配送は可能ですか？", en: "Do you ship internationally?" },
          a: {
            ja: `はい、国・地域によって海外配送が可能です。チェックアウト画面に表示される配送可否をご確認ください。`,
            en: `Yes, international shipping is available depending on the destination. Please check availability at checkout.`
          }
        }
      ]
    },

    // PRODUCT & PRICING
    {
      section: { ja: "PRODUCT & PRICING", en: "PRODUCT & PRICING" },
      items: [
        {
          id: "pricing",
          important: true,
          tags: { ja: ["重要", "価格"], en: ["Important", "Pricing"] },
          q: { ja: "販売価格について", en: "About pricing" },
          a: {
            ja: `表示されている販売価格には、制作費・印刷費・素材費・運営コストが含まれています。<br>
                 受注生産のため、価格は予告なく変更される場合があります（為替・原材料価格等の影響）。`,
            en: `Listed prices include production, printing, materials, and operational costs.<br>
                 As items are made to order, prices may change without notice due to exchange rates or material costs.`
          }
        }
      ]
    },

    // SIZE / CARE (GUIDE)
    {
      section: { ja: "SIZE / CARE (GUIDE)", en: "SIZE / CARE (GUIDE)" },
      items: [
        {
          id: "size_choose",
          important: false,
          tags: { ja: ["サイズ"], en: ["Size"] },
          q: { ja: "自分に合うサイズはどう選べばいいですか？", en: "How should I choose my size?" },
          a: {
            ja: `トップス・アウターは<b>身幅（平置き）×2＝仕上がり胸囲</b>を基準に、シューズは<b>足長（cm）</b>と<b>アウトソール長</b>を基準にお選びください。<br>
                 詳しくは各商品ページのSize Guide（実寸表）をご確認ください。`,
            en: `For tops/outerwear, use <b>body width (flat) × 2 = garment chest</b>. For shoes, use <b>foot length (cm)</b> and <b>outsole length</b>.<br>
                 Please check each product page’s Size Guide (measurements).`
          }
        },
        {
          id: "care",
          important: false,
          tags: { ja: ["お手入れ"], en: ["Care"] },
          q: { ja: "お手入れ方法は？", en: "How should I care for items?" },
          a: {
            ja: `アパレルは裏返し・低温洗い・自然乾燥推奨。プリント面への高温アイロンや乾燥機は避けてください。<br>
                 シューズは柔らかい布やブラシで軽く汚れを落とし、陰干し推奨です。`,
            en: `For apparel: wash inside out, use cold/low temperature, and air dry when possible. Avoid high-heat ironing on prints and tumble drying.<br>
                 For shoes: gently clean with a soft cloth/brush and dry in the shade.`
          }
        }
      ]
    },

    // PRODUCT IMAGES (AI MODEL)
    {
      section: { ja: "PRODUCT IMAGES", en: "PRODUCT IMAGES" },
      items: [
        {
          id: "model_real",
          important: true,
          tags: { ja: ["重要", "商品画像"], en: ["Important", "Product Images"] },
          q: { ja: "商品画像のモデルは実在の人物ですか？", en: "Are the models in product images real people?" },
          a: {
            ja: `商品画像に使用しているモデルは、AIによって生成されたイメージモデルを使用しています。<br>実在の人物ではありません。`,
            en: `We use AI-generated image models in product visuals.<br>They are not real people.`
          }
        },
        {
          id: "model_numbers_accuracy",
          important: false,
          tags: { ja: ["商品画像"], en: ["Product Images"] },
          q: { ja: "モデルの身長や着用サイズは正確な数値ですか？", en: "Are the model height and worn size accurate measurements?" },
          a: {
            ja: `画像内に記載しているモデル身長・着用サイズは、スタイリングの目安として設定した参考値です。<br>
                 実際の人物測定値を示すものではありません。`,
            en: `Any model height / worn size shown in images is a styling reference for visualization.<br>
                 It does not represent measurements of a real person.`
          }
        },
        {
          id: "why_show_model_info",
          important: false,
          tags: { ja: ["サイズ", "商品画像"], en: ["Size", "Product Images"] },
          q: { ja: "なぜモデル身長や着用サイズを記載しているのですか？", en: "Why do you show model height and worn size?" },
          a: {
            ja: `商品を着用した際のシルエットやサイズ感のイメージを掴んでいただくために記載しています。<br>
                 サイズ選びの最終判断は、必ず<b>サイズガイド（実寸表）</b>をご確認ください。`,
            en: `We provide it to help you imagine the silhouette and fit when worn.<br>
                 For final sizing decisions, please rely on the <b>Size Guide (measurements)</b>.`
          }
        },
        {
          id: "shoe_no_height",
          important: false,
          tags: { ja: ["シューズ", "商品画像"], en: ["Shoes", "Product Images"] },
          q: { ja: "シューズ画像にモデル身長が記載されていないのはなぜですか？", en: "Why don’t shoe images show model height?" },
          a: {
            ja: `シューズは身長ではなく、足の長さ・足幅・フィット感が重要なためです。<br>
                 そのため、画像には<b>着用サイズ</b>や<b>サイズ感（標準／大きめ／小さめ）</b>を記載しています。`,
            en: `For shoes, height matters far less than foot length/width and fit.<br>
                 That’s why we show <b>worn size</b> and fit notes (<b>true to size / runs large / runs small</b>).`
          }
        },
        {
          id: "image_differs",
          important: true,
          tags: { ja: ["重要", "商品画像"], en: ["Important", "Product Images"] },
          q: { ja: "画像と実際の商品で印象が異なることはありますか？", en: "Can the product look different from the images?" },
          a: {
            ja: `撮影環境・表示デバイス・個人の体型差により、見え方に差が生じる場合があります。<br>
                 そのため、画像は参考イメージとしてご覧いただき、必ず実寸情報をご確認ください。`,
            en: `Differences in lighting, device displays, and individual body shapes can affect how items look.<br>
                 Please treat images as references and always check measurement details.`
          }
        }
      ]
    }
  ];

  // ====== DOM refs ======
  const elYear = document.getElementById("year");
  const elLast = document.getElementById("lastUpdated");
  const elSub = document.getElementById("subText");
  const elHint1 = document.getElementById("hint1");
  const elHint2 = document.getElementById("hint2");
  const elEmpty = document.getElementById("emptyState");
  const elRoot = document.getElementById("faqRoot");
  const elSearch = document.getElementById("faqSearch");
  const elClear = document.getElementById("clearSearch");
  const elSchema = document.getElementById("faqSchema");

  const btnJa = document.getElementById("btn-ja");
  const btnEn = document.getElementById("btn-en");

  // ====== State ======
  let lang = "ja";
  let lastQuery = "";

  // ====== Helpers ======
  const escHtml = (s) =>
    String(s)
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;")
      .replaceAll("'","&#39;");

  // highlight on plain-text fields (we apply to q only; answer stays HTML)
  function highlightText(text, qLower) {
    if (!qLower) return escHtml(text);
    const raw = text;
    const idx = raw.toLowerCase().indexOf(qLower);
    if (idx === -1) return escHtml(raw);

    const before = raw.slice(0, idx);
    const hit = raw.slice(idx, idx + qLower.length);
    const after = raw.slice(idx + qLower.length);
    return `${escHtml(before)}<span class="match">${escHtml(hit)}</span>${escHtml(after)}`;
  }

  function setUI() {
    document.documentElement.lang = lang;
    const t = UI[lang];

    elSub.textContent = t.sub;
    elHint1.textContent = t.hint1;
    elHint2.textContent = t.hint2;

    elSearch.placeholder = t.placeholder;
    elClear.textContent = t.clear;

    elEmpty.textContent = t.empty;
    elLast.textContent = t.lastUpdated;

    btnJa.setAttribute("aria-pressed", lang === "ja" ? "true" : "false");
    btnEn.setAttribute("aria-pressed", lang === "en" ? "true" : "false");

    // year
    elYear.textContent = String(new Date().getFullYear());
  }

  function buildSchema(visibleFaqItems) {
    // FAQPage: mainEntity = visible items (current language)
    const t = UI[lang];

    const mainEntity = visibleFaqItems.map(it => ({
      "@type": "Question",
      "name": it.q[lang],
      "acceptedAnswer": {
        "@type": "Answer",
        // JSON-LDはテキスト推奨。HTMLタグは落とす（雑に消す）
        "text": it.a[lang].replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()
      }
    }));

    const json = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "name": t.schemaName,
      "mainEntity": mainEntity
    };

    elSchema.textContent = JSON.stringify(json);
  }

  function render() {
    const q = (lastQuery || "").trim().toLowerCase();
    const sections = [];

    // flatten for filtering + schema
    const visibleForSchema = [];

    for (const group of FAQ) {
      const items = [];

      for (const it of group.items) {
        const qText = it.q[lang];
        const aHtml = it.a[lang]; // answer kept as HTML

        // searchable text (tags included)
        const tagStr = (it.tags[lang] || []).join(" ");
        const hay = `${qText} ${tagStr} ${aHtml.replace(/<[^>]*>/g, " ")}`.toLowerCase();

        const ok = !q || hay.includes(q);

        if (ok) {
          items.push(it);
          visibleForSchema.push(it);
        }
      }

      if (items.length) sections.push({ title: group.section[lang], items });
    }

    // empty state
    elEmpty.style.display = sections.length ? "none" : "block";

    // render DOM
    elRoot.innerHTML = sections.map(sec => {
      const secId = "sec-" + sec.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return `
        <section class="section" aria-labelledby="${escHtml(secId)}">
          <h2 class="section-title" id="${escHtml(secId)}">${escHtml(sec.title)}</h2>
          ${sec.items.map(it => {
            const isOpen = IMPORTANT_OPEN_DEFAULT && !!it.important && !q;
            const tags = (it.tags[lang] || []).map(t => `<span class="tag">${escHtml(t)}</span>`).join("");
            const qHtml = highlightText(it.q[lang], q);

            return `
              <details class="faq-item" data-id="${escHtml(it.id)}" ${isOpen ? "open" : ""}>
                <summary>
                  <div class="qleft">
                    <div class="qbadge">Q</div>
                    <div>
                      <div class="qtext">${qHtml}</div>
                      <div class="tags">${tags}</div>
                    </div>
                  </div>
                  <div class="icon" aria-hidden="true">+</div>
                </summary>
                <div class="ans"><b>A.</b> ${it.a[lang]}</div>
              </details>
            `;
          }).join("")}
        </section>
      `;
    }).join("");

    // schema update
    buildSchema(visibleForSchema);
  }

  function clearSearch() {
    lastQuery = "";
    elSearch.value = "";
    render();
  }

  // ====== Events ======
  btnJa.addEventListener("click", () => { lang = "ja"; setUI(); render(); });
  btnEn.addEventListener("click", () => { lang = "en"; setUI(); render(); });

  elClear.addEventListener("click", clearSearch);

  elSearch.addEventListener("input", () => {
    lastQuery = elSearch.value;
    render();
  });

  // ====== Init ======
  setUI();
  render();
})();
