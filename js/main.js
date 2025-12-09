// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const id = link.getAttribute('href').slice(1);
    const target = document.getElementById(id);
    if (target) {
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Add shadow to nav on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) nav.classList.add('nav-scrolled');
  else nav.classList.remove('nav-scrolled');
});

// Reveal sections on scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ===== 64 Arts Helper Chatbot =====

const ARTS = [
  `1. गीतम् (Gītam) – Singing`,
  `2. वाद्यम् (Vādyam) – Playing musical instruments`,
  `3. नृत्यम् (Nṛtyam) – Dancing`,
  `4. नाट्यम् (Nāṭyam) – Drama, acting`,
  `5. आलेख्यम् (Ālekhyam) – Painting, drawing`,
  `6. विस्रम्भकचेष्टितकथनम् (Visrambhaka-ceṣṭita-kathanam) – Expressive conversation & gestures`,
  `7. चित्रयोगः (Citra-yogaḥ) – Preparing canvases, artistic groundwork`,
  `8. माल्यग्रन्थनविकल्पः (Mālya-granthana-vikalpaḥ) – Garland making & floral decoration`,
  `9. केशमार्जनकौशलम् (Keśa-mārjana-kaushalam) – Hairdressing & hair decoration`,
  `10. भूषणयोजनम् (Bhūṣaṇa-yojanam) – Body ornamentation`,
  `11. आभरणरचनम् (Ābharaṇa-racanam) – Designing ornaments`,
  `12. चित्रकर्म (Citra-karma) – Artistic painting & sculpture`,
  `13. शयनरचना (Śayana-racanā) – Bed making, interior ambience`,
  `14. उदकवाद्य (Udaka-vādya) – Playing music with water (jal-tarang)`,
  `15. पुष्पशकटिकाविन्यासः (Puṣpa-śakaṭikā-vinyāsaḥ) – Flower arranging & floral motifs`,
  `16. दन्तवेष्टकनिर्माणम् (Danta-veṣṭaka-nirmāṇam) – Ivory / wood crafting`,
  `17. नानाविधशिल्पकर्म (Nānavidha-śilpa-karma) – Sculpture & carving`,
  `18. तन्त्रकर्म (Tantra-karma) – Mechanical arts, making devices`,
  `19. मणिरचना (Maṇi-racanā) – Gem-setting & jewel art`,
  `20. आभरणोपनिषदः (Ābharaṇopaniṣadaḥ) – Theory & study of ornaments`,
  `21. शुद्धिपाक (Śuddhi-pāka) – Cooking & cuisine`,
  `22. रसायनकर्म (Rasāyana-karma) – Alchemy & chemistry`,
  `23. धातुवादः (Dhātu-vādaḥ) – Metal working & metallurgy`,
  `24. मणिभूमिकाकर्म (Maṇi-bhūmikā-karma) – Floor decoration, rangoli`,
  `25. जलक्रीडा (Jala-krīḍā) – Water sports & playful games`,
  `26. वीणावादन (Vīṇā-vādana) – Playing the Vīṇā`,
  `27. वायुवादन (Vāyu-vādana) – Playing wind instruments`,
  `28. तालवादन (Tāla-vādana) – Percussion & rhythm`,
  `29. काव्यालङ्कार (Kāvya-alaṅkāra) – Poetry & rhetoric`,
  `30. छन्दः (Chandaḥ) – Versification & metre`,
  `31. निबन्ध (Nibandha) – Essay writing & composition`,
  `32. कथा (Kathā) – Storytelling`,
  `33. प्रहेलिका (Prahelikā) – Riddles & puzzles`,
  `34. दुर्गकाव्य (Durga-kāv्य) – Dramatic / complex poetry`,
  `35. शिल्पविद्या (Śilpa-vid्यā) – Knowledge of sculpture`,
  `36. वास्तुविद्या (Vāstu-vidyā) – Architecture & design`,
  `37. चित्रभित्ति (Citra-bhitti) – Mural painting`,
  `38. रङ्गभूषण (Ranga-bhūṣaṇa) – Stage decoration`,
  `39. कुसुमविन्यास (Kusuma-vinyāsa) – Bouquet & floral arrangement`,
  `40. अङ्गराग (Aṅgarāga) – Cosmetics & perfumery`,
  `41. गन्धयोजना (Gandha-yojanā) – Blending perfumes`,
  `42. वार्तालाप (Vārtālāpa) – Art of conversation`,
  `43. संकीर्तन (Saṅkīrtana) – Group singing`,
  `44. नृत्याभिनय (Nṛtya-abhinaya) – Expressive dance`,
  `45. लास्य (Lāsya) – Graceful feminine dance`,
  `46. ताण्डव (Tāṇḍava) – Vigorous masculine dance`,
  `47. गीतकाव्य (Gīta-kāvya) – Lyric poetry`,
  `48. छायाचित्र (Chāyā-citra) – Shadow play & silhouettes`,
  `49. रूपककथन (Rūpaka-kathana) – Dramatic plays`,
  `50. पत्रलेखन (Patra-lekhana) – Letter writing & calligraphy`,
  `51. संख्यान (Saṅkhyāna) – Arithmetic`,
  `52. गणित (Gaṇita) – Mathematics`,
  `53. ज्योतिष (Jyotiṣa) – Astronomy & astrology`,
  `54. रसायनविद्या (Rasāyana-vidyā) – Chemistry / medicine`,
  `55. धातुशास्त्र (Dhātu-śāstra) – Science of metals`,
  `56. आयुर्वेद (Āyurveda) – Medical science`,
  `57. धनुर्वेद (Dhanurveda) – Martial arts & archery`,
  `58. हस्तलाघव (Hasta-lāghava) – Sleight of hand & magic`,
  `59. आकृतिग्रहण (Ākṛti-grahaṇa) – Mimicry & impressions`,
  `60. उपदेशविद्या (Upadeśa-vidyā) – Teaching & instruction`,
  `61. योगविद्या (Yoga-vidyā) – Yoga & spiritual practice`,
  `62. ध्यानविद्या (Dhyāna-vidyā) – Meditation & concentration`,
  `63. मन्त्रविद्या (Mantra-vidyā) – Sacred chants & mantras`,
  `64. तन्त्रविद्या (Tantra-vidyā) – Ritual sciences & systems`
];

function artsByIndices(indices){
  return indices.map(i => ARTS[i-1]);
}

function getChatReply(text){
  const t = text.toLowerCase();

  // ask for full list
  if ((t.includes('list') || t.includes('all')) && (t.includes('64') || t.includes('arts'))) {
    return `Here are the 64 traditional arts:\n\n${ARTS.join('\n')}`;
  }

  let rec = [];
  let focus = '';

  if (t.match(/sing|music|song|vocal|bhajan|kirtan/)){
    rec = artsByIndices([1,2,26,27,28,43,47,14]);
    focus = 'music & sound';
  } else if (t.match(/dance|movement|bharatanatyam|kathak|odissi|nritya/)){
    rec = artsByIndices([3,4,44,45,46]);
    focus = 'dance & performance';
  } else if (t.match(/paint|drawing|art|visual|design|illustrat/)){
    rec = artsByIndices([5,7,12,17,24,35,36,37,38,48]);
    focus = 'visual & design arts';
  } else if (t.match(/craft|handicraft|jewell|jewel|ornament|flower|weav|embroid/)){
    rec = artsByIndices([8,10,11,16,17,19,20,39]);
    focus = 'craft, ornaments & floral work';
  } else if (t.match(/write|poet|story|storytell|literature|book|author/)){
    rec = artsByIndices([29,30,31,32,33,34,47,50]);
    focus = 'writing, poetry & storytelling';
  } else if (t.match(/math|number|science|logic|astro|astrolo|physics|engineer/)){
    rec = artsByIndices([51,52,53,54,55,22,23]);
    focus = 'mathematical & scientific arts';
  } else if (t.match(/heal|health|doctor|medicine|yoga|meditat|energy/)){
    rec = artsByIndices([54,56,61,62,63]);
    focus = 'healing, yoga & inner sciences';
  } else if (t.match(/fight|martial|archery|weapon|warrior/)){
    rec = artsByIndices([57,58]);
    focus = 'martial & physical mastery';
  } else if (t.match(/teach|mentor|trainer|coach|guru/)){
    rec = artsByIndices([60,29,32]);
    focus = 'teaching & knowledge sharing';
  }

  let reply = '';

  if (rec.length){
    reply += `Based on what you shared, you seem drawn to **${focus}**.\n\n`;
    reply += `Some Kalās that could suit you:\n`;
    reply += rec.join('\n');
  } else {
    // generic recommendation
    const starter = artsByIndices([1,3,5,29,51,61]);
    reply += `Beautiful! Many Kalās could fit you. Here are a few foundational arts:\n`;
    reply += starter.join('\n');
  }

  reply += `\n\nEntrepreneur tip: Start by choosing 1–2 core Kalās to master. Document your journey (videos, posts), run small workshops, and gradually price your time and creations. KALA64 supports you with Learn → Teach → Artpreneur pathways.`;

  return reply;
}

// UI wiring
const chatToggle = document.getElementById('chat-toggle');
const chatPanel = document.getElementById('chat-panel');
const chatClose = document.getElementById('chat-close');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');

if (chatToggle && chatPanel && chatMessages && chatInput && chatSend && chatClose) {

  function appendMsg(text, type){
    const div = document.createElement('div');
    div.className = type === 'user' ? 'user-msg' : 'bot-msg';
    div.innerHTML = text.replace(/\n/g,'<br>');
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function handleSend(){
    const text = chatInput.value.trim();
    if (!text) return;
    appendMsg(text, 'user');
    chatInput.value = '';
    const reply = getChatReply(text);
    setTimeout(() => appendMsg(reply, 'bot'), 300);
  }

  chatSend.addEventListener('click', handleSend);

  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  });

  chatToggle.addEventListener('click', () => {
    chatPanel.classList.toggle('open');
  });

  chatClose.addEventListener('click', () => {
    chatPanel.classList.remove('open');
  });
}
