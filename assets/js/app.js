(() => {
  // Footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // ===== UI strings =====
  const UI = {
    jp: {
      tap: "質問（Q）をタップすると回答（A）が表示されます。重要項目は最初から開いています。",
      noticeTitle: "IMPORTANT (SIZE RECOMMENDATION)",
      noticeBody: `当サイトの「おすすめサイズ」は、入力いただいた数値とサイズ表（仕上がり寸法）をもとに算出した目安です。<br>
「推定入力（身長＋体重/BMI＋性別）」は、ヌード寸法が分からない場合の補助機能であり、実測値ではありません。<br>
推定結果は必要に応じて 「推定値をセット」 で反映できます（自動で上書きはしません）。<br>
より正確に選ぶには、可能な限りヌード寸法（例：ヌード胸囲／足長）を実測してご入力ください。<br>
※表の数値は仕上がり（完成）寸法です。測り方により ±1〜2cm（±0.5〜0.8in） 程度の差が出る場合があります。`,
      placeholder: "キーワードで検索（例：関税 / 返品 / 支払い / 推定 / モデル）",
      clear: "クリア",
      hint1: "検索は表示中の言語のみ対象です。",
      hint2: "例：customs / returns / payment / estimator",
      empty: "該当するFAQが見つかりませんでした。別のキーワードで試してください。"
    },
    en: {
      tap: "Tap a question to reveal the answer. Important items are opened by default.",
      noticeTitle: "IMPORTANT (SIZE RECOMMENDATION)",
      noticeBody: `The “Recommended size” is a guideline calculated from your inputs and our size charts (finished garment measurements).<br>
The “Estimator” (height + weight/BMI + sex) is a support feature when you don’t know your nude measurements, and it is not an actual body measurement.<br>
You can apply the estimated result by tapping “Set estimated value” (it will NOT overwrite automatically).<br>
For best accuracy, please measure and enter your nude measurements whenever possible (e.g., nude chest / foot length).<br>
Size charts show finished measurements. Small variations of ±1–2 cm (±0.5–0.8 in) may occur depending on how measured.`,
      placeholder: "Search keywords (e.g., customs / returns / payment / estimator / model)",
      clear: "Clear",
      hint1: "Search applies only to the currently displayed language.",
      hint2: "Examples: customs / returns / payment / estimator",
      empty: "No matching FAQs found. Try another keyword."
    }
  };

  // ===== FAQ data =====
  const FAQ = [
    {
      section: { jp: "RETURNS & EXCHANGES", en: "RETURNS & EXCHANGES" },
      items: [
        {
          id: "return_exchange",
          important: true,
          tags: { jp: ["重要", "返品", "交換"], en: ["Important", "Returns", "Exchanges"] },
          q: { jp: "返品・交換はできますか？", en: "Can I return or exchange my item?" },
          a: {
            jp: `<b>A.</b> 当ショップの商品はオンデマンド生産（受注生産）のため、<b>お客様都合による返品・交換はお受けしておりません</b>。<br>
ただし、商品に初期不良があった場合や当店の不備による誤配送の場合は、状況確認のうえ対応いたします。商品到着後、できるだけ早くお問い合わせください。`,
            en: `<b>A.</b> Because items are made to order, we <b>do not accept returns or exchanges based on customer preference</b>.<br>
If your item is defective or incorrectly delivered due to our error, we will assist after confirming the situation. Please contact us as soon as possible after receiving the item.`
          }
        },
        {
          id: "defective_wrong",
          important: false,
          tags: { jp: ["サポート", "初期不良", "誤配送"], en: ["Support", "Defect", "Wrong item"] },
          q: { jp: "初期不良・誤配送の場合は？", en: "What if my item is defective or incorrect?" },
          a: {
            jp: `<b>A.</b> 商品に不備（初期不良）がある場合、または当店都合の誤配送の場合は、状況確認のうえ対応いたします。<br>
お届け後できるだけ早くご連絡ください（該当箇所の写真があるとスムーズです）。`,
            en: `<b>A.</b> If your item is defective or incorrect due to our error, we will assist after confirming the situation.<br>
Please contact us as soon as possible (photos help speed things up).`
          }
        },
        {
          id: "size_not_fit",
          important: false,
          tags: { jp: ["サイズ", "返品"], en: ["Size", "Returns"] },
          q: { jp: "サイズが合わなかった場合は？", en: "Can I exchange for a different size?" },
          a: {
            jp: `<b>A.</b> 受注生産のため、原則として<b>サイズ都合での返品・交換はお受けできません</b>。<br>
ご購入前にサイズ表をご確認ください。迷った場合は、後述の「サイズが合わなかったと感じたら（チェック）」も参考にしてください。`,
            en: `<b>A.</b> Because items are made to order, we generally <b>cannot accept size-based exchanges or returns</b>.<br>
Please check the size chart before purchasing. See “If the size didn’t feel right (quick checks)” for guidance.`
          }
        }
      ]
    },

    {
      section: { jp: "PAYMENT METHODS", en: "PAYMENT METHODS" },
      items: [
        {
          id: "payment_methods",
          important: true,
          tags: { jp: ["重要", "支払い"], en: ["Important", "Payment"] },
          q: { jp: "利用できる支払い方法は？（代金の支払方法・時期）", en: "What payment methods are accepted? (Payment method & timing)" },
          a: {
            jp: `<b>A.</b> お支払い方法は、<b>BASEが提供する決済方法</b>に準拠します。<br>
クレジットカード、PayPal、その他購入画面に表示される決済方法をご利用いただけます。<br>
お支払い時期は、ご注文確定時となります。`,
            en: `<b>A.</b> Payment methods follow those provided by <b>BASE</b>.<br>
Options include credit cards, PayPal, and other methods shown at checkout.<br>
Payment is required when your order is confirmed.`
          }
        }
      ]
    },

    {
      section: { jp: "SHIPPING & DELIVERY", en: "SHIPPING & DELIVERY" },
      items: [
        {
          id: "delivery_timing",
          important: true,
          tags: { jp: ["重要", "配送"], en: ["Important", "Shipping"] },
          q: { jp: "商品の発送・お届け時期は？", en: "When will my order be produced and delivered?" },
          a: {
            jp: `<b>A.</b> 当ショップの商品はすべてオンデマンド生産（受注生産）です。ご注文確定後、制作期間を経て発送されます。<br>
制作期間および配送日数は商品やお届け先の国・地域により異なります。詳しい目安は各商品ページをご確認ください。`,
            en: `<b>A.</b> All items are made to order. Production starts after your order is confirmed, then the item ships once completed.<br>
Production and shipping times vary by product and destination. Please refer to each product page for estimates.`
          }
        },
        {
          id: "tracking",
          important: false,
          tags: { jp: ["追跡", "配送"], en: ["Tracking", "Shipping"] },
          q: { jp: "追跡番号（トラッキング）はありますか？", en: "Will I get a tracking number?" },
          a: {
            jp: `<b>A.</b> 発送後、追跡番号が発行される場合は通知または注文情報からご確認いただけます（配送方法・国により異なる場合があります）。`,
            en: `<b>A.</b> If a tracking number is issued, you can check it via notifications or order details (depends on carrier and destination).`
          }
        }
      ]
    },

    {
      section: { jp: "INTERNATIONAL SHIPPING", en: "INTERNATIONAL SHIPPING" },
      items: [
        {
          id: "customs",
          important: true,
          tags: { jp: ["重要", "関税"], en: ["Important", "Customs"] },
          q: { jp: "関税・輸入税はかかりますか？", en: "Will I need to pay customs duties or import taxes?" },
          a: {
            jp: `<b>A.</b> お届け先の国・地域によっては、関税・輸入税・通関手数料が発生する場合があります（原則：購入者負担）。<br>
税額や条件は各国の規定により異なります。`,
            en: `<b>A.</b> Depending on your country, customs duties, import taxes, or clearance fees may apply (generally paid by the buyer).<br>
Amounts and rules vary by country.`
          }
        },
        {
          id: "international",
          important: false,
          tags: { jp: ["海外配送"], en: ["International shipping"] },
          q: { jp: "海外配送は可能ですか？", en: "Do you ship internationally?" },
          a: {
            jp: `<b>A.</b> はい、国・地域によって海外配送が可能です。チェックアウト画面に表示される配送可否をご確認ください。`,
            en: `<b>A.</b> Yes, international shipping is available depending on the destination. Please check availability at checkout.`
          }
        }
      ]
    },

    {
      section: { jp: "PRODUCT & PRICING", en: "PRODUCT & PRICING" },
      items: [
        {
          id: "pricing",
          important: true,
          tags: { jp: ["重要", "価格"], en: ["Important", "Pricing"] },
          q: { jp: "販売価格について", en: "About pricing" },
          a: {
            jp: `<b>A.</b> 表示されている販売価格には、制作費・印刷費・素材費・運営コストが含まれています。<br>
受注生産のため、価格は予告なく変更される場合があります（為替・原材料価格等の影響）。`,
            en: `<b>A.</b> Listed prices include production, printing, materials, and operational costs.<br>
As items are made to order, prices may change without notice due to exchange rates or material costs.`
          }
        }
      ]
    },

    {
      section: { jp: "SIZE ESTIMATOR (BY PRODUCT)", en: "SIZE ESTIMATOR (BY PRODUCT)" },
      items: [
        // T-shirts
        {
          id: "tee_estimator_no_autofill",
          important: true,
          tags: { jp: ["重要", "Tシャツ", "推定入力"], en: ["Important", "T-shirts", "Estimator"] },
          q: { jp: "（Tシャツ）推定胸囲が出ました。ヌード胸囲に自動反映されますか？", en: "(T-shirts) Will the estimated chest auto-fill my nude chest?" },
          a: {
            jp: `<b>A.</b> いいえ。推定は実測ではないため、自動で上書きしません。必要な場合のみ 「推定値をセット」 を押して反映してください。`,
            en: `<b>A.</b> No. Because it’s an estimate, it will NOT overwrite automatically. Tap “Set estimated value” only if you want to apply it.`
          }
        },
        {
          id: "tee_choose_reference",
          important: true,
          tags: { jp: ["重要", "Tシャツ", "胸囲", "選び方"], en: ["Important", "T-shirts", "Chest", "How to choose"] },
          q: { jp: "（Tシャツ）何を基準に選べばいい？", en: "(T-shirts) What should I use as the main reference?" },
          a: {
            jp: `<b>A.</b> 基本は <b>ヌード胸囲</b> です。好み（ぴったり/標準/ゆったり）で「ゆとり」を調整し、仕上がり胸囲がヌード胸囲より大きくなるサイズを選んでください。<br>
最短で失敗を減らすなら、手持ちの「一番好きなTシャツ」を平置きで測って、サイズ表の近い数値を選ぶのが確実です。`,
            en: `<b>A.</b> Use your <b>nude chest</b> as the main reference. Adjust ease by your fit preference and choose a size where the finished chest is larger than your nude chest.<br>
Fastest way to avoid mistakes: measure your favorite T-shirt (flat) and pick the closest numbers in the chart.`
          }
        },
        {
          id: "tee_mens_womens_diff",
          important: false,
          tags: { jp: ["Tシャツ", "Men's", "Women's"], en: ["T-shirts", "Men's", "Women's"] },
          q: { jp: "（Tシャツ）Men’s と Women’s の違いは？", en: "(T-shirts) What’s the difference between Men’s and Women’s?" },
          a: {
            jp: `<b>A.</b> 同じサイズ表でも、Women’sはフィット寄り、Men’sは直線的/ゆったりになりやすい傾向があります（体感は体型で変わります）。`,
            en: `<b>A.</b> Even with similar charts, Women’s tends to be more fitted, while Men’s is typically straighter/looser (feel depends on body type).`
          }
        },

        // Hoodies
        {
          id: "hoodie_chest_reference",
          important: true,
          tags: { jp: ["重要", "フーディ", "胸囲", "重ね着"], en: ["Important", "Hoodies", "Chest", "Layering"] },
          q: { jp: "（フーディ）トップスと同じで胸囲基準でいい？", en: "(Hoodies/Zip hoodies) Can I use chest as the main reference?" },
          a: {
            jp: `<b>A.</b> 基本は同じです。フーディは重ね着が増えるので、迷ったら <b>標準〜ゆったり</b> が安全です。肩位置や袖の体感差が出やすいので、<b>身幅→着丈→袖丈</b> の順で優先してください。`,
            en: `<b>A.</b> Yes. Hoodies are often layered, so Standard to Loose is usually safer if you’re between sizes. Prioritize <b>Chest (flat) → Length → Sleeve</b>.`
          }
        },
        {
          id: "hoodie_sleeve_worry",
          important: false,
          tags: { jp: ["フーディ", "袖丈"], en: ["Hoodies", "Sleeve"] },
          q: { jp: "（フーディ）袖丈が不安です", en: "(Hoodies/Zip hoodies) I’m worried about sleeve length." },
          a: {
            jp: `<b>A.</b> 袖は肩線の位置で体感が変わります。袖丈だけで決めず、身幅と肩まわりの余裕も合わせて確認してください。`,
            en: `<b>A.</b> Sleeve feel depends on the shoulder seam position. Don’t decide by sleeve length alone—check chest/shoulder ease as well.`
          }
        },

        // Slip-ons
        {
          id: "slipon_best_inputs",
          important: true,
          tags: { jp: ["重要", "スリッポン", "足長", "アウトソール"], en: ["Important", "Slip-ons", "Foot length", "Outsole"] },
          q: { jp: "（スリッポン）靴は何を入力すれば正確？", en: "(Slip-on canvas shoes) What should I enter for accuracy?" },
          a: {
            jp: `<b>A.</b> 最優先は <b>足長（かかと〜つま先）</b> です。アウトソール長はブランドや設計で差があるため、参考値として使ってください。<br>
厚手ソックスで履く場合は、その分も考慮してください。`,
            en: `<b>A.</b> The most important input is your <b>foot length (heel to toe)</b>. Outsole length varies by design, so treat it as a reference. Consider sock thickness if you wear thicker socks.`
          }
        },
        {
          id: "slipon_half_wide",
          important: false,
          tags: { jp: ["スリッポン", "足幅", "甲高", "ハーフサイズ"], en: ["Slip-ons", "Wide feet", "High instep", "Half size"] },
          q: { jp: "（スリッポン）ハーフサイズや足幅が広い場合は？", en: "(Slip-on canvas shoes) What if I’m between sizes or have wide feet?" },
          a: {
            jp: `<b>A.</b> 足幅が広め／甲高の方は、きつさを感じやすいので <b>0.5サイズ相当上</b>（または余裕のある選び方）がおすすめです。迷う場合は「普段のスニーカーサイズ」と「足長」の両方で判断してください。`,
            en: `<b>A.</b> If you have wider feet/high instep, consider going about <b>half a size up</b> (or choose a roomier option). Use both your usual sneaker size and foot length.`
          }
        }
      ]
    },

    {
      section: { jp: "IF THE SIZE DIDN’T FEEL RIGHT", en: "IF THE SIZE DIDN’T FEEL RIGHT" },
      items: [
        {
          id: "size_off_quick_checks",
          important: true,
          tags: { jp: ["重要", "サイズ", "チェック"], en: ["Important", "Size", "Quick checks"] },
          q: { jp: "サイズが合わなかったと感じたら（2〜3問チェック）", en: "If the size didn’t feel right (2–3 quick checks)" },
          a: {
            jp: `<b>A.</b>
<ol>
  <li><b>きついのはどこ？</b>
    <ul>
      <li>胸・肩まわり → 次は 1サイズ上（または「ゆったり」を選択）</li>
      <li>丈だけ短い/長い → サイズ表の着丈を優先して近いサイズへ</li>
      <li>袖だけ違和感 → 袖は肩線位置で変わるため、次回は 身幅→着丈→袖丈の順で選ぶ</li>
    </ul>
  </li>
  <li><b>入力は実測？推定？</b>
    <ul>
      <li>推定入力だった → 次回は ヌード寸法を実測して再計算（推定は誤差が出ます）</li>
    </ul>
  </li>
  <li><b>比較対象は「普段着」？</b>
    <ul>
      <li>迷う場合 → いちばん好きな服を平置きで測り、<b>身幅（平置き）</b>が近いサイズを選ぶ（最短で失敗が減ります）</li>
    </ul>
  </li>
</ol>`,
            en: `<b>A.</b>
<ol>
  <li><b>Where did it feel off?</b>
    <ul>
      <li>Tight in chest/shoulders → choose one size up (or select “Loose”)</li>
      <li>Only length feels off → prioritize body length in the size chart</li>
      <li>Only sleeves feel off → sleeve feel depends on shoulder seam; prioritize Chest (flat) → Length → Sleeve</li>
    </ul>
  </li>
  <li><b>Did you use a measured value or an estimate?</b>
    <ul>
      <li>If estimated → re-check with actual nude measurements (estimates can vary)</li>
    </ul>
  </li>
  <li><b>Compare with a favorite item</b><br>
    Measure your best-fitting item flat and choose the closest Chest (flat) in the chart.
  </li>
</ol>`
          }
        }
      ]
    },

    {
      section: { jp: "PRODUCT IMAGES", en: "PRODUCT IMAGES" },
      items: [
        {
          id: "ai_model_real",
          important: true,
          tags: { jp: ["重要", "商品画像", "モデル"], en: ["Important", "Images", "Model"] },
          q: { jp: "商品画像のモデルは実在の人物ですか？", en: "Are the models in product images real people?" },
          a: {
            jp: `<b>A.</b> 商品画像に使用しているモデルは、AIによって生成されたイメージモデルを使用しています。実在の人物ではありません。`,
            en: `<b>A.</b> We use AI-generated image models in our product visuals. They are not real individuals.`
          }
        },
        {
          id: "model_height_size_accuracy",
          important: false,
          tags: { jp: ["商品画像", "身長", "着用サイズ"], en: ["Images", "Height", "Wearing size"] },
          q: { jp: "モデルの身長や着用サイズは正確な数値ですか？", en: "Are the model’s height and wearing size exact?" },
          a: {
            jp: `<b>A.</b> 画像内に記載しているモデル身長・着用サイズは、スタイリングの目安として設定した参考値です。実際の人物測定値を示すものではありません。`,
            en: `<b>A.</b> Any height/size shown is a styling reference value for guidance. It is not an actual measured body value.`
          }
        },
        {
          id: "why_show_height_size",
          important: false,
          tags: { jp: ["商品画像", "サイズ感"], en: ["Images", "Fit"] },
          q: { jp: "なぜモデル身長や着用サイズを記載しているのですか？", en: "Why do you show model height and wearing size?" },
          a: {
            jp: `<b>A.</b> 商品を着用した際のシルエットやサイズ感のイメージを掴んでいただくためです。サイズ選びの最終判断は、必ずサイズ表（実寸/仕上がり寸法）をご確認ください。`,
            en: `<b>A.</b> To help you visualize silhouette and fit. Final sizing decisions should be based on the size chart (finished measurements).`
          }
        },
        {
          id: "shoes_no_height",
          important: false,
          tags: { jp: ["シューズ", "商品画像"], en: ["Shoes", "Images"] },
          q: { jp: "シューズ画像にモデル身長が記載されていないのはなぜですか？", en: "Why don’t shoe images show model height?" },
          a: {
            jp: `<b>A.</b> シューズは身長ではなく、足の長さ・足幅・フィット感が重要なためです。そのため、画像には着用サイズやサイズ感（標準／大きめ／小さめ）を記載しています。`,
            en: `<b>A.</b> For shoes, foot length/width and fit matter more than height. We focus on wearing size and fit notes instead.`
          }
        },
        {
          id: "image_vs_real",
          important: true,
          tags: { jp: ["重要", "色味", "見え方"], en: ["Important", "Color", "Display"] },
          q: { jp: "画像と実際の商品で印象が異なることはありますか？", en: "Can the actual item look different from the images?" },
          a: {
            jp: `<b>A.</b> 撮影環境・表示デバイス・個人の体型差により、見え方に差が生じる場合があります。画像は参考イメージとしてご覧いただき、必ず実寸情報をご確認ください。`,
            en: `<b>A.</b> Yes. Appearance may vary due to lighting, display settings, and body differences. Use images as a reference and confirm the size chart.`
          }
        }
      ]
    },

    {
      section: { jp: "CARE", en: "CARE" },
      items: [
        {
          id: "care",
          important: false,
          tags: { jp: ["お手入れ"], en: ["Care"] },
          q: { jp: "お手入れ方法は？", en: "How should I care for items?" },
          a: {
            jp: `<b>A.</b> アパレルは裏返し・低温洗い・自然乾燥推奨。プリント面への高温アイロンや乾燥機は避けてください。<br>
シューズは柔らかい布やブラシで軽く汚れを落とし、陰干し推奨です。`,
            en: `<b>A.</b> For apparel: wash inside out, use cold/low temperature, and air dry when possible. Avoid high-heat ironing on prints and tumble drying.<br>
For shoes: gently clean with a soft cloth/brush and dry in the shade.`
          }
        }
      ]
    }
  ];

  // ===== state =====
  let lang = "jp"; // "jp" or "en"

  // ===== helpers =====
  const $ = (sel) => document.querySelector(sel);
  const faqRoot = $("#faqRoot");
  const searchInput = $("#faqSearch");
  const emptyState = $("#emptyState");

  function setLang(next) {
    lang = next;
    document.documentElement.lang = (lang === "en") ? "en" : "ja";

    // buttons
    $("#btn-jp").setAttribute("aria-pressed", lang === "jp" ? "true" : "false");
    $("#btn-en").setAttribute("aria-pressed", lang === "en" ? "true" : "false");

    // UI strings
    const t = UI[lang];
    $("#tapHint").textContent = t.tap;
    $("#noticeTitle").textContent = t.noticeTitle;
    $("#noticeBody").innerHTML = t.noticeBody;
    searchInput.placeholder = t.placeholder;
    $("#clearSearch").textContent = t.clear;
    $("#hint1").textContent = t.hint1;
    $("#hint2").textContent = t.hint2;
    emptyState.textContent = t.empty;

    renderFAQ();
    clearSearch(false); // keep input? -> reset highlights but keep state off by default
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    }[c]));
  }

  function stripHtml(html) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return (div.textContent || "").replace(/\s+/g, " ").trim();
  }

  function highlightHTML(html, term) {
    if (!term) return html;
    const safe = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const re = new RegExp(safe, "ig");
    return html.replace(re, (m) => `<span class="match">${m}</span>`);
  }

  function renderFAQ() {
    faqRoot.innerHTML = "";

    FAQ.forEach((sec) => {
      const sectionEl = document.createElement("section");
      sectionEl.className = "section";

      const h2 = document.createElement("h2");
      h2.className = "section-title";
      h2.textContent = sec.section[lang];
      sectionEl.appendChild(h2);

      sec.items.forEach((item, idx) => {
        const details = document.createElement("details");
        details.className = "faq-item";
        details.dataset.id = item.id;
        details.dataset.important = item.important ? "true" : "false";
        if (item.important) details.open = true;

        const summary = document.createElement("summary");

        const left = document.createElement("div");
        left.className = "qleft";

        const badge = document.createElement("div");
        badge.className = "qbadge";
        badge.textContent = "Q";

        const qwrap = document.createElement("div");

        const qtext = document.createElement("div");
        qtext.className = "qtext";
        qtext.innerHTML = escapeHtml(item.q[lang]); // safe: store as text
        // (we'll highlight later by rewriting innerHTML)

        const tags = document.createElement("div");
        tags.className = "tags";
        (item.tags?.[lang] || []).forEach((tg) => {
          const span = document.createElement("span");
          span.className = "tag";
          span.textContent = tg;
          tags.appendChild(span);
        });

        qwrap.appendChild(qtext);
        qwrap.appendChild(tags);

        left.appendChild(badge);
        left.appendChild(qwrap);

        const icon = document.createElement("div");
        icon.className = "icon";
        icon.setAttribute("aria-hidden", "true");
        icon.textContent = "+";

        summary.appendChild(left);
        summary.appendChild(icon);

        const ans = document.createElement("div");
        ans.className = "ans";
        ans.innerHTML = item.a[lang]; // answers intentionally allow <b>, <br>, <ol>, <ul>

        details.appendChild(summary);
        details.appendChild(ans);
        sectionEl.appendChild(details);
      });

      faqRoot.appendChild(sectionEl);
    });
  }

  function applySearch() {
    const q = searchInput.value.trim().toLowerCase();

    // reset state by re-rendering (simple & reliable)
    renderFAQ();

    if (!q) {
      emptyState.style.display = "none";
      openImportant();
      return;
    }

    let shown = 0;
    const allDetails = Array.from(document.querySelectorAll("details.faq-item"));

    allDetails.forEach((d) => {
      const qEl = d.querySelector(".qtext");
      const tagsEl = d.querySelector(".tags");
      const aEl = d.querySelector(".ans");

      const qText = qEl ? stripHtml(qEl.innerHTML) : "";
      const aText = aEl ? stripHtml(aEl.innerHTML) : "";
      const tagText = tagsEl ? stripHtml(tagsEl.innerHTML) : "";

      const hay = (qText + " " + aText + " " + tagText).toLowerCase();
      const ok = hay.includes(q);

      if (ok) {
        shown++;
        d.open = true;

        // highlight on current render
        if (qEl) qEl.innerHTML = highlightHTML(qEl.innerHTML, q);
        if (aEl) aEl.innerHTML = highlightHTML(aEl.innerHTML, q);
        // tags are plain text spans, no highlight needed
      } else {
        d.remove(); // remove from DOM for clean layout
      }
    });

    emptyState.style.display = (shown === 0) ? "block" : "none";
  }

  function openImportant() {
    document.querySelectorAll("details.faq-item").forEach((d) => {
      if (d.dataset.important === "true") d.open = true;
    });
  }

  function clearSearch(apply = true) {
    searchInput.value = "";
    if (apply) applySearch();
  }

  // ===== events =====
  $("#btn-jp").addEventListener("click", () => setLang("jp"));
  $("#btn-en").addEventListener("click", () => setLang("en"));
  $("#clearSearch").addEventListener("click", () => clearSearch(true));
  searchInput.addEventListener("input", applySearch);

  // ===== init =====
  setLang("jp");
})();
