/* =====================================================
   PHOENIX RACERS - AI-style Chatbot
   chatbot.js
   Runs entirely in the browser. No backend required.
   Update the knowledge objects below to change answers.
   ===================================================== */

(function () {
  "use strict";

  /* =====================================================
     1) KNOWLEDGE BASE
     Everything the bot "knows" lives in these objects so
     it can be updated easily without touching the logic.
     ===================================================== */

  // ---- Phoenix Racers team knowledge ----
  const phoenix = {
    teamName: "Phoenix Racers",
    mission:
      "Our team combines creativity, engineering, teamwork and innovation to compete in STEM Racing.",
    competitionDate: "31 October 2026",
    pages: ["Home", "Car Design", "Team", "Sponsors", "Contact"],
    members: [
      { name: "Aarav", role: "Team Manager", desc: "Coordinates activities and keeps the team organized." },
      { name: "Vivaan", role: "Design Engineer", desc: "Creates innovative and aerodynamic car concepts." },
      { name: "Arjun", role: "Manufacturing Engineer", desc: "Supports construction and testing of the car." },
      { name: "Advik", role: "Graphics Designer", desc: "Develops team branding and presentations." },
      { name: "Reyansh", role: "Sponsorship Manager", desc: "Builds partnerships and sponsor relationships." },
      { name: "Kabir", role: "Marketing Manager", desc: "Promotes the team and manages communications." },
    ],
  };

  // ---- STEM Racing / F1 in Schools knowledge ----
  const stemRacing = {
    what:
      "STEM Racing (formerly known as F1 in Schools) is a global competition where student teams design, engineer, and race miniature CO₂-powered Formula 1 cars. It blends science, technology, engineering, and maths with real racing excitement! 🏎️",
    formerName:
      "STEM Racing was formerly called F1 in Schools. It was rebranded to highlight the STEM (Science, Technology, Engineering, Maths) skills students develop.",
    skills:
      "Students learn engineering design, CAD, aerodynamics, manufacturing, project management, teamwork, marketing, budgeting, and public speaking — real-world skills for future engineers and leaders!",
    roles:
      "A typical team has roles like Team Manager, Design Engineer, Manufacturing Engineer, Graphics Designer, Sponsorship Manager, and Marketing Manager — just like the Phoenix Racers!",
    aerodynamics:
      "Aerodynamics is crucial because the cars travel over 20 metres in about 1 second! A smooth, low-drag shape lets air flow cleanly around the car so it goes faster. Every curve is optimized to cut through the air. 💨",
    cad:
      "CAD stands for Computer-Aided Design. Teams use CAD software to design their car in 3D, test aerodynamics virtually, and prepare the design for manufacturing on a CNC machine.",
    india:
      "STEM Racing India (run under STEMplify) brings the global STEM Racing challenge to Indian schools, giving students a chance to compete nationally and qualify for the World Finals.",
    stemplify:
      "STEMplify is the organization that runs STEM Racing in India (STEM Racing India). It promotes hands-on STEM learning through exciting real-world engineering challenges for students.",
  };

  // ---- Formula 1 general FAQ ----
  const f1FAQ = {
    formula1:
      "Formula 1 (F1) is the highest class of international motor racing. Teams build incredibly fast single-seater cars that race on circuits around the world at speeds over 300 km/h! 🏁",
    constructors:
      "The Constructors' Championship is awarded to the team (constructor) that scores the most points across a season, combining the results of both its drivers.",
    drivers:
      "The Drivers' Championship is won by the individual driver who scores the most points over the season. It's the ultimate prize for an F1 driver!",
    aerodynamics:
      "In F1, aerodynamics create 'downforce' that pushes the car onto the track, giving grip for high-speed corners — while keeping drag low on the straights. It's a constant balancing act.",
    pitstops:
      "A pit stop is when a car stops for fresh tyres or repairs. Top F1 teams can change all four tyres in under 2.5 seconds — teamwork and precision at its finest! ⚡",
    strategy:
      "Racing strategy is about choosing the right tyres and pit stop timing to gain track position. Teams use data and weather to decide when to stop and which tyres to fit.",
    teams:
      "Famous F1 teams include Ferrari (the oldest and most iconic), Mercedes, Red Bull Racing, McLaren, and Williams.",
    drivers_famous:
      "Legendary F1 drivers include Lewis Hamilton, Michael Schumacher, Ayrton Senna, Max Verstappen, and Sebastian Vettel.",
  };

  // ---- Recent F1 championship data (easy to update!) ----
  const f1Knowledge = {
    season: "2025",
    latestChampion: "Max Verstappen",
    constructorsChampion: "McLaren",
    seasonHighlights: [
      "A fiercely competitive season with multiple race winners across several teams.",
      "McLaren showed outstanding pace to fight at the front all year.",
      "Rising young drivers made their mark with impressive podium finishes.",
    ],
  };

  /* =====================================================
     2) INTENTS
     Each intent has trigger keywords and an answer.
     Answers can be text or a function returning text.
     The 'nav' property triggers page scrolling.
     ===================================================== */

  const intents = [
    // --- Phoenix Racers ---
    {
      id: "about-team",
      keywords: ["phoenix", "racers", "your team", "about you", "who are you", "what do you do", "your mission", "mission"],
      answer: () =>
        `We are ${phoenix.teamName}! ${phoenix.mission} Our competition is on ${phoenix.competitionDate}. 🔥`,
      suggestions: ["Meet the Team", "Show Car Design", "When is your competition?"],
    },
    {
      id: "team-members",
      keywords: ["team member", "members", "meet the team", "who is on", "roster", "players", "students"],
      nav: "#team",
      answer: () => {
        const list = phoenix.members
          .map((m) => `• <strong>${m.name}</strong> — ${m.role}`)
          .join("<br>");
        return `Meet our six-member team:<br>${list}<br><br>Scrolling you to the Team section! 👇`;
      },
      suggestions: ["Who is the team manager?", "Who is the design engineer?"],
    },
    {
      id: "team-manager",
      keywords: ["team manager", "manager", "who leads", "in charge", "captain"],
      answer: () => {
        const m = phoenix.members.find((x) => x.role === "Team Manager");
        return `Our Team Manager is <strong>${m.name}</strong>. ${m.desc}`;
      },
    },
    {
      id: "design-engineer",
      keywords: ["design engineer", "designer", "who designs"],
      answer: () => {
        const m = phoenix.members.find((x) => x.role === "Design Engineer");
        return `Our Design Engineer is <strong>${m.name}</strong>. ${m.desc}`;
      },
    },
    {
      id: "car-design",
      keywords: ["car design", "car", "show car", "design", "prototype", "views", "gallery"],
      nav: "#car-design",
      answer:
        "Our car design showcases the Front View, Side View, Top View, Aerodynamic Features, and Prototype Model. Taking you to the Car Design gallery now! 🏎️",
      suggestions: ["Explain Aerodynamics", "What is CAD?"],
    },
    {
      id: "sponsors",
      keywords: ["sponsor", "sponsors", "partner", "partnership", "gold", "silver", "bronze", "funding"],
      nav: "#sponsors",
      answer:
        "We have Gold, Silver, and Bronze sponsor tiers. Partner with us to support the next generation of innovators! Scrolling to the Sponsors section. 🤝",
      suggestions: ["How can I sponsor you?", "Contact the team"],
    },
    {
      id: "contact",
      keywords: ["contact", "email", "reach you", "get in touch", "message", "phone"],
      nav: "#contact",
      answer:
        "You can reach us at <strong>contact@phoenixracers.com</strong> or use the contact form. Taking you there now! 📧",
      suggestions: ["Who are your sponsors?", "Tell me about Phoenix Racers"],
    },
    {
      id: "competition-date",
      keywords: ["competition", "countdown", "race day", "when is", "date", "event", "timer"],
      nav: "#home",
      answer: () =>
        `Our big competition day is <strong>${phoenix.competitionDate}</strong> at 9:00 AM! Check the live countdown timer on the Home page. ⏱️`,
      suggestions: ["What is STEM Racing?", "Meet the Team"],
    },
    {
      id: "home",
      keywords: ["home", "top", "start", "beginning", "main page"],
      nav: "#home",
      answer: "Taking you back to the Home page! 🏠",
    },

    // --- STEM Racing ---
    {
      id: "stem-racing",
      keywords: ["stem racing", "f1 in schools", "formula 1 in schools", "what is stem", "competition about"],
      answer: () => stemRacing.what,
      suggestions: ["What skills do students learn?", "Why is aerodynamics important?", "What is CAD?"],
    },
    {
      id: "former-name",
      keywords: ["formerly", "former name", "used to be called", "old name", "renamed", "rebrand"],
      answer: () => stemRacing.formerName,
    },
    {
      id: "skills",
      keywords: ["skills", "learn", "what do students learn", "teach", "education"],
      answer: () => stemRacing.skills,
      suggestions: ["What roles are involved?", "What is CAD?"],
    },
    {
      id: "roles",
      keywords: ["roles", "positions", "jobs", "what roles"],
      answer: () => stemRacing.roles,
    },
    {
      id: "aero",
      keywords: ["aerodynamics", "aero", "downforce", "drag", "airflow", "air flow"],
      answer: () => stemRacing.aerodynamics,
      suggestions: ["What is CAD?", "Show Car Design"],
    },
    {
      id: "cad",
      keywords: ["cad", "computer aided design", "3d design", "software"],
      answer: () => stemRacing.cad,
    },
    {
      id: "stemplify",
      keywords: ["stemplify", "stem racing india", "india competition", "national competition"],
      answer: () => `${stemRacing.stemplify}<br><br>${stemRacing.india}`,
      suggestions: ["What is STEM Racing?", "What skills do students learn?"],
    },

    // --- Formula 1 general ---
    {
      id: "f1",
      keywords: ["what is formula 1", "what is f1", "about formula 1", "formula one", "explain f1"],
      answer: () => f1FAQ.formula1,
      suggestions: ["Latest Formula 1 Champion", "Tell me about pit stops", "What is racing strategy?"],
    },
    {
      id: "constructors",
      keywords: ["constructors championship", "constructor", "team championship"],
      answer: () => f1FAQ.constructors,
    },
    {
      id: "drivers-champ",
      keywords: ["drivers championship", "driver championship", "world champion driver"],
      answer: () => f1FAQ.drivers,
    },
    {
      id: "pitstops",
      keywords: ["pit stop", "pitstop", "pit stops", "tyre change", "tire change"],
      answer: () => f1FAQ.pitstops,
    },
    {
      id: "strategy",
      keywords: ["strategy", "race strategy", "racing strategy", "tactics"],
      answer: () => f1FAQ.strategy,
    },
    {
      id: "famous-teams",
      keywords: ["famous team", "best team", "ferrari", "mercedes", "red bull", "mclaren", "which teams"],
      answer: () => f1FAQ.teams,
    },
    {
      id: "famous-drivers",
      keywords: ["famous driver", "best driver", "hamilton", "schumacher", "senna", "verstappen", "which drivers", "greatest driver"],
      answer: () => f1FAQ.drivers_famous,
    },

    // --- Recent championship ---
    {
      id: "latest-champion",
      keywords: ["latest champion", "who won", "current champion", "world champion", "recent champion", "last champion", "champion this year"],
      answer: () =>
        `In the ${f1Knowledge.season} season, the Drivers' Champion was <strong>${f1Knowledge.latestChampion}</strong> and the Constructors' Champion was <strong>${f1Knowledge.constructorsChampion}</strong>. 🏆`,
      suggestions: ["Season highlights", "What is Formula 1?"],
    },
    {
      id: "season-highlights",
      keywords: ["season highlights", "highlights", "what happened this season", "recent season"],
      answer: () =>
        `Highlights from the ${f1Knowledge.season} season:<br>` +
        f1Knowledge.seasonHighlights.map((h) => `• ${h}`).join("<br>"),
    },

    // --- Help / greeting ---
    {
      id: "greeting",
      keywords: ["hello", "hi", "hey", "greetings", "good morning", "good evening"],
      answer: "Hello there! 👋 I'm the Phoenix Racers Assistant. Ask me about our team, car, sponsors, STEM Racing, or Formula 1!",
      suggestions: ["Tell me about Phoenix Racers", "What is STEM Racing?", "Latest Formula 1 Champion"],
    },
    {
      id: "thanks",
      keywords: ["thank", "thanks", "cheers", "appreciate"],
      answer: "You're very welcome! 🏎️ Keep chasing those checkered flags. Anything else I can help with?",
    },
    {
      id: "help",
      keywords: ["help", "what can you do", "options", "menu"],
      answer:
        "I can help you with:<br>• Our Team<br>• Car Design<br>• Sponsors<br>• Competition Countdown<br>• STEM Racing / F1 in Schools<br>• STEMplify<br>• Formula 1 Facts<br><br>What would you like to know?",
      suggestions: ["Meet the Team", "What is STEM Racing?", "Latest Formula 1 Champion"],
    },
  ];

  // Default suggested questions shown with the welcome message
  const defaultSuggestions = [
    "Tell me about Phoenix Racers",
    "Meet the Team",
    "What is STEM Racing?",
    "What is STEMplify?",
    "Show Competition Countdown",
    "Explain Aerodynamics",
    "Latest Formula 1 Champion",
  ];

  const welcomeMessage =
    "Hello! I'm the <strong>Phoenix Racers Assistant</strong> 🏎️<br><br>" +
    "I can help you learn about:<br>" +
    "• Our Team<br>• Our Car Design<br>• Sponsors<br>• Competition Countdown<br>" +
    "• STEM Racing / F1 in Schools<br>• STEMplify<br>• Formula 1 Facts<br><br>" +
    "How can I help you today?";

  const fallbackResponses = [
    "Hmm, I'm not sure about that one yet! 🤔 Try asking about our team, car design, STEM Racing, or Formula 1.",
    "I didn't quite catch that. You can ask me things like \"What is STEM Racing?\" or \"Who won the latest F1 championship?\"",
    "Great question! I may not know that one, but I'm happy to tell you about Phoenix Racers, our sponsors, or Formula 1. 🏁",
  ];

  /* =====================================================
     3) MATCHING ENGINE (keyword + fuzzy)
     ===================================================== */

  const normalize = (str) =>
    str.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();

  // Levenshtein distance for fuzzy (typo-tolerant) matching
  function levenshtein(a, b) {
    const m = a.length;
    const n = b.length;
    if (!m) return n;
    if (!n) return m;
    const dp = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
      }
    }
    return dp[m][n];
  }

  // Is a keyword token close enough to any input token? (typo tolerant)
  function fuzzyTokenMatch(inputTokens, word) {
    if (word.length <= 3) return inputTokens.includes(word);
    const threshold = word.length <= 5 ? 1 : 2;
    return inputTokens.some((t) => {
      if (t === word) return true;
      if (Math.abs(t.length - word.length) > threshold) return false;
      return levenshtein(t, word) <= threshold;
    });
  }

  // Score an intent against the normalized user input
  function scoreIntent(intent, normInput, inputTokens) {
    let score = 0;
    for (const keyword of intent.keywords) {
      const k = normalize(keyword);
      if (k.includes(" ")) {
        // Multi-word phrase: strong signal if the whole phrase appears
        if (normInput.includes(k)) score += 3;
        else {
          // Partial: count fuzzy-matched words in the phrase
          const words = k.split(" ");
          const hits = words.filter((w) => fuzzyTokenMatch(inputTokens, w)).length;
          if (hits === words.length) score += 2;
          else if (hits > 0) score += hits * 0.5;
        }
      } else {
        if (normInput.includes(k)) score += 1.5;
        else if (fuzzyTokenMatch(inputTokens, k)) score += 1;
      }
    }
    return score;
  }

  function findBestIntent(userText) {
    const normInput = normalize(userText);
    const inputTokens = normInput.split(" ").filter(Boolean);
    let best = null;
    let bestScore = 0;
    for (const intent of intents) {
      const score = scoreIntent(intent, normInput, inputTokens);
      if (score > bestScore) {
        bestScore = score;
        best = intent;
      }
    }
    // Require a minimum confidence to avoid random matches
    return bestScore >= 1 ? best : null;
  }

  const resolveAnswer = (intent) =>
    typeof intent.answer === "function" ? intent.answer() : intent.answer;

  /* =====================================================
     4) UI CONSTRUCTION (injected into the page)
     ===================================================== */

  const template = `
    <button class="pr-chat-toggle" id="pr-chat-toggle" aria-label="Open Phoenix Racers chat assistant" aria-expanded="false">
      <span class="pr-chat-toggle-icon" aria-hidden="true">💬</span>
      <span class="pr-chat-toggle-close" aria-hidden="true">✕</span>
    </button>

    <section class="pr-chat-window" id="pr-chat-window" role="dialog" aria-label="Phoenix Racers chat assistant" aria-hidden="true">
      <header class="pr-chat-header">
        <div class="pr-chat-logo">
          <span class="pr-chat-logo-icon" aria-hidden="true">🔥</span>
          <div>
            <p class="pr-chat-title">PHOENIX<span>RACERS</span></p>
            <p class="pr-chat-status"><span class="pr-dot"></span>Assistant online</p>
          </div>
        </div>
        <button class="pr-chat-min" id="pr-chat-min" aria-label="Close chat">✕</button>
      </header>

      <div class="pr-chat-messages" id="pr-chat-messages" aria-live="polite"></div>

      <div class="pr-chat-suggestions" id="pr-chat-suggestions" aria-label="Suggested questions"></div>

      <form class="pr-chat-input" id="pr-chat-form" autocomplete="off">
        <label for="pr-chat-text" class="pr-visually-hidden">Type your message</label>
        <input type="text" id="pr-chat-text" placeholder="Ask me anything..." aria-label="Type your message" />
        <button type="submit" class="pr-chat-send" aria-label="Send message">➤</button>
      </form>
    </section>
  `;

  let els = {};
  let opened = false; // whether the welcome has been shown

  function buildUI() {
    const container = document.createElement("div");
    container.className = "pr-chatbot";
    container.innerHTML = template;
    document.body.appendChild(container);

    els = {
      toggle: document.getElementById("pr-chat-toggle"),
      window: document.getElementById("pr-chat-window"),
      minimize: document.getElementById("pr-chat-min"),
      messages: document.getElementById("pr-chat-messages"),
      suggestions: document.getElementById("pr-chat-suggestions"),
      form: document.getElementById("pr-chat-form"),
      input: document.getElementById("pr-chat-text"),
    };

    els.toggle.addEventListener("click", toggleChat);
    els.minimize.addEventListener("click", closeChat);
    els.form.addEventListener("submit", onSubmit);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && els.window.classList.contains("open")) closeChat();
    });
  }

  /* =====================================================
     5) CHAT BEHAVIOUR
     ===================================================== */

  const history = []; // conversation history {role, text}

  function toggleChat() {
    els.window.classList.contains("open") ? closeChat() : openChat();
  }

  function openChat() {
    els.window.classList.add("open");
    els.window.setAttribute("aria-hidden", "false");
    els.toggle.classList.add("active");
    els.toggle.setAttribute("aria-expanded", "true");
    if (!opened) {
      opened = true;
      botSay(welcomeMessage, defaultSuggestions);
    }
    setTimeout(() => els.input.focus(), 300);
  }

  function closeChat() {
    els.window.classList.remove("open");
    els.window.setAttribute("aria-hidden", "true");
    els.toggle.classList.remove("active");
    els.toggle.setAttribute("aria-expanded", "false");
  }

  function scrollToBottom() {
    els.messages.scrollTop = els.messages.scrollHeight;
  }

  // Render a message bubble
  function addMessage(text, role) {
    const msg = document.createElement("div");
    msg.className = `pr-msg pr-msg-${role}`;
    if (role === "bot") {
      msg.innerHTML = `<span class="pr-msg-avatar" aria-hidden="true">🏎️</span><div class="pr-msg-bubble">${text}</div>`;
    } else {
      msg.innerHTML = `<div class="pr-msg-bubble">${text}</div>`;
    }
    els.messages.appendChild(msg);
    history.push({ role, text });
    scrollToBottom();
  }

  // Render quick-reply suggestion buttons
  function renderSuggestions(list) {
    els.suggestions.innerHTML = "";
    if (!list || !list.length) return;
    list.forEach((q) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "pr-suggestion";
      btn.textContent = q;
      btn.addEventListener("click", () => {
        handleUserInput(q);
      });
      els.suggestions.appendChild(btn);
    });
  }

  // Bot message with typing animation, optional navigation + suggestions
  function botSay(text, suggestions, navTarget) {
    renderSuggestions([]); // hide old suggestions while typing
    const typing = document.createElement("div");
    typing.className = "pr-msg pr-msg-bot";
    typing.innerHTML =
      '<span class="pr-msg-avatar" aria-hidden="true">🏎️</span>' +
      '<div class="pr-msg-bubble pr-typing"><span></span><span></span><span></span></div>';
    els.messages.appendChild(typing);
    scrollToBottom();

    const delay = Math.min(1200, 400 + text.length * 8);
    setTimeout(() => {
      typing.remove();
      addMessage(text, "bot");
      renderSuggestions(suggestions);
      if (navTarget) navigateTo(navTarget);
    }, delay);
  }

  // Smooth-scroll the main page to a section
  function navigateTo(selector) {
    const target = document.querySelector(selector);
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 400);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    const text = els.input.value.trim();
    if (!text) return;
    els.input.value = "";
    handleUserInput(text);
  }

  function handleUserInput(text) {
    addMessage(text, "user");
    const intent = findBestIntent(text);
    if (intent) {
      botSay(resolveAnswer(intent), intent.suggestions, intent.nav);
    } else {
      const fb = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
      botSay(fb, defaultSuggestions.slice(0, 4));
    }
  }

  /* =====================================================
     6) INIT
     ===================================================== */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", buildUI);
  } else {
    buildUI();
  }
})();
