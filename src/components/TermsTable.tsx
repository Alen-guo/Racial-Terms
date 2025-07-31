'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Search, Filter, X } from 'lucide-react'

// 词汇数据接口
interface TableTerm {
  word: string
  problematic: string
  alternative: string
  category: string
}

// 表格数据
const tableTerms: TableTerm[] = [
  // 严重侮辱性词汇
  {
    word: "Chink",
    problematic: "Anti-Asian slur",
    alternative: "Extremely offensive term targeting East Asians",
    category: "severe"
  },
  {
    word: "N-word",
    problematic: "Anti-Black slur",
    alternative: "Historically dehumanizing, tied to slavery",
    category: "severe"
  },
  {
    word: "Spic",
    problematic: "Anti-Latinx slur",
    alternative: "Derogatory toward Hispanic/Latino people",
    category: "severe"
  },
  {
    word: "Jap",
    problematic: "Anti-Japanese slur",
    alternative: "War-era slur with racist overtones",
    category: "severe"
  },
  {
    word: "Paki",
    problematic: "Anti-South Asian",
    alternative: "UK slur for Pakistani and Indian people",
    category: "severe"
  },
  {
    word: "Gook",
    problematic: "Anti-Asian",
    alternative: "Offensive term used in war contexts (esp. Vietnam War)",
    category: "severe"
  },
  {
    word: "Towelhead",
    problematic: "Anti-Muslim/Arab",
    alternative: "Mocking head coverings in Islamic culture",
    category: "severe"
  },
  {
    word: "Redskin",
    problematic: "Anti-Native American",
    alternative: "Racist sports term, now widely retired",
    category: "severe"
  },
  {
    word: "Half-breed",
    problematic: "Mixed race",
    alternative: "Used to devalue biracial/multiracial individuals",
    category: "severe"
  },
  {
    word: "Wetback",
    problematic: "Anti-Mexican",
    alternative: "Slur mocking border crossing",
    category: "severe"
  },
  {
    word: "Chinaman",
    problematic: "Anti-Chinese slur",
    alternative: "Offensive term for Chinese people",
    category: "moderate"
  },
  {
    word: "Oriental",
    problematic: "Outdated and offensive term for Asians",
    alternative: "Use specific nationality or 'Asian'",
    category: "moderate"
  },
  // 刻板印象类用词
  {
    word: "Ghetto",
    problematic: "Implies Black, poor, unrefined",
    alternative: "Use: underprivileged area, urban",
    category: "stereotype"
  },
  {
    word: "Exotic (for people)",
    problematic: "Objectifies non-white women",
    alternative: "Use: striking, distinctive",
    category: "stereotype"
  },
  {
    word: "Thug",
    problematic: "Racialized term for Black men",
    alternative: "Use: violent person, criminal",
    category: "stereotype"
  },
  {
    word: "Articulate (as a surprise)",
    problematic: "Implies most Black people are not",
    alternative: "Don't use as backhanded compliment",
    category: "stereotype"
  },
  {
    word: "Model minority",
    problematic: "Stereotype about Asians being high-achieving",
    alternative: "Avoid generalizations",
    category: "stereotype"
  },
  {
    word: "Primitive",
    problematic: "Dehumanizes indigenous/non-Western groups",
    alternative: "Use: traditional, ancestral",
    category: "stereotype"
  },
  {
    word: "Illegal alien",
    problematic: "Criminalizes immigrants",
    alternative: "Use: undocumented immigrant",
    category: "stereotype"
  },
  {
    word: "White trash",
    problematic: "Classist and racialized",
    alternative: "Use: low-income, struggling",
    category: "stereotype"
  },
  // 媒体政治中的隐形种族语言
  {
    word: "Inner city",
    problematic: "Often coded for 'Black' areas",
    alternative: "Use: specific neighborhoods, by name",
    category: "coded"
  },
  {
    word: "Welfare queen",
    problematic: "Racist stereotype of Black single mothers",
    alternative: "Avoid entirely",
    category: "coded"
  },
  {
    word: "Urban youth",
    problematic: "Often implies Black or Latino young men",
    alternative: "Use specific demographic",
    category: "coded"
  },
  {
    word: "Anchor baby",
    problematic: "Xenophobic term for immigrant children",
    alternative: "Use: U.S.-born child of immigrants",
    category: "coded"
  },
  {
    word: "Chain migration",
    problematic: "Misleading, weaponized against immigrants",
    alternative: "Use: family reunification immigration",
    category: "coded"
  },
  {
    word: "Sh*thole countries",
    problematic: "Trump-era term for developing nations",
    alternative: "Use: developing countries (if necessary)",
    category: "coded"
  },
  {
    word: "Border crisis",
    problematic: "Often used to stir anti-immigrant fear",
    alternative: "Use: migration management issue",
    category: "coded"
  },
  // 殖民历史背景词汇
  {
    word: "Savage",
    problematic: "Dehumanizing Indigenous people",
    alternative: "Use: violent (for actions, not people)",
    category: "colonial"
  },
  {
    word: "Tribe (for companies/groups)",
    problematic: "Trivializes Indigenous identity",
    alternative: "Use: group, team, cohort",
    category: "colonial"
  },
  {
    word: "Eskimo",
    problematic: "Outdated term for Inuit/Yupik people",
    alternative: "Use: Inuit, by nation",
    category: "colonial"
  },
  {
    word: "Indian (for Native Americans)",
    problematic: "Inaccurate term from colonial era",
    alternative: "Use: Native American, Indigenous",
    category: "colonial"
  },
  {
    word: "Third World",
    problematic: "Outdated Cold War term",
    alternative: "Use: developing countries",
    category: "colonial"
  },
  {
    word: "Civilizing mission",
    problematic: "Tied to colonial racism",
    alternative: "Avoid romanticizing colonialism",
    category: "colonial"
  },
  // 带有偏见但常被误认为中立的表达
  {
    word: "I don't see color",
    problematic: "Erases racial identity and lived experience",
    alternative: "Acknowledge and respect diversity",
    category: "biased"
  },
  {
    word: "You're not like other [race]",
    problematic: "Backhanded compliment; reinforces stereotypes",
    alternative: "Compliment without comparison",
    category: "biased"
  },
  {
    word: "All lives matter",
    problematic: "Used to undermine 'Black Lives Matter'",
    alternative: "Acknowledge BLM context",
    category: "biased"
  },
  {
    word: "Go back to your country",
    problematic: "Xenophobic, anti-immigrant",
    alternative: "Never acceptable",
    category: "biased"
  },
  {
    word: "You speak English so well!",
    problematic: "Implies surprise that a non-white person is fluent",
    alternative: "Simply compliment communication",
    category: "biased"
  },
  {
    word: "That's so ghetto",
    problematic: "Associates 'cheap' or 'low-class' with Black culture",
    alternative: "Use: basic, low-quality, etc.",
    category: "biased"
  },
  {
    word: "Acting white",
    problematic: "Stereotype of Black success = 'white behavior'",
    alternative: "Don't use at all",
    category: "biased"
  },
  // 具有历史偏见根源的普通词
  {
    word: "Master/slave (in tech)",
    problematic: "Rooted in slavery imagery",
    alternative: "Use: primary/secondary, leader/follower",
    category: "historical"
  },
  {
    word: "Grandfathered in",
    problematic: "Comes from Jim Crow voting restrictions",
    alternative: "Use: legacy rule",
    category: "historical"
  },
  {
    word: "Blacklist / Whitelist",
    problematic: "Color = moral value",
    alternative: "Use: blocklist / allowlist",
    category: "historical"
  },
  {
    word: "Peanut gallery",
    problematic: "Originated in segregated theaters",
    alternative: "Use: audience, hecklers",
    category: "historical"
  },
  {
    word: "No can do",
    problematic: "Mocking Asian English",
    alternative: "Use: I can't",
    category: "historical"
  },
  {
    word: "Long time no see",
    problematic: "Rooted in 'broken' English caricatures",
    alternative: "Use: Great to see you again!",
    category: "historical"
  },
  {
    word: "Gypped",
    problematic: "Anti-Romani stereotype of theft",
    alternative: "Use: cheated, overcharged",
    category: "historical"
  },
  // 媒体流行文化词汇
  {
    word: "Banana / Twinkie",
    problematic: "Yellow on the outside, white inside – mocks Asian Americans assimilating",
    alternative: "Do not use",
    category: "media"
  },
  {
    word: "Oreo",
    problematic: "Black outside, white inside – implies whiteness = intelligence",
    alternative: "Do not use",
    category: "media"
  },
  {
    word: "Jungle music",
    problematic: "Racist term used to belittle Black music genres",
    alternative: "Use genre name (hip-hop, Afrobeat)",
    category: "media"
  },
  {
    word: "Tribe vibes / tribal theme",
    problematic: "Trivializes Indigenous cultures",
    alternative: "Use: cultural, natural, primal",
    category: "media"
  },
  {
    word: "Spirit animal",
    problematic: "Offends Indigenous sacred beliefs",
    alternative: "Use: personal icon, role model",
    category: "media"
  },
  {
    word: "Chinese whispers (UK)",
    problematic: "Implies distortion is tied to 'Chinese' behavior",
    alternative: "Use: telephone game",
    category: "media"
  },
  // 职场招聘语境
  {
    word: "Cultural fit",
    problematic: "Often excludes minorities who don't 'fit in'",
    alternative: "Use: values alignment, team synergy",
    category: "workplace"
  },
  {
    word: "Aggressive (when used selectively)",
    problematic: "Often selectively used to describe confident Black women",
    alternative: "Use specific behavior descriptions (direct, honest)",
    category: "workplace"
  },
  {
    word: "Clean-cut",
    problematic: "Implies 'neat appearance' defaults to white, upper-class image",
    alternative: "Use: professional, well-groomed appearance",
    category: "workplace"
  },
  // 营销品牌语言
  {
    word: "Fair-skinned / skin whitening",
    problematic: "Reinforces colorism",
    alternative: "Use: brightening, even skin tone",
    category: "marketing"
  },
  {
    word: "Ethnic (in product names)",
    problematic: "Exoticizes non-white styles",
    alternative: "Be specific: African, Asian, etc.",
    category: "marketing"
  },
  {
    word: "Oriental flavors / decor",
    problematic: "Outdated and overly general",
    alternative: "Use: East Asian, Southeast Asian, etc.",
    category: "marketing"
  },
  {
    word: "Third World taste / look",
    problematic: "Derogatory toward developing countries",
    alternative: "Use: traditional, regional",
    category: "marketing"
  },
  // 法律政府历史语境
  {
    word: "Lynch mob / lynch",
    problematic: "Evokes racial violence history",
    alternative: "Use: angry crowd, attack mob",
    category: "legal"
  },
  {
    word: "Indian giver",
    problematic: "Derogatory slur rooted in stereotype",
    alternative: "Use: promise-breaker (if necessary)",
    category: "legal"
  },
  {
    word: "Squaw",
    problematic: "Highly offensive Indigenous slur",
    alternative: "Do not use at all",
    category: "legal"
  },
  {
    word: "Plantation (used in names)",
    problematic: "Romanticizes slave history",
    alternative: "Consider rebranding: estate, grove",
    category: "legal"
  },
  {
    word: "Colonize (in creative/tech)",
    problematic: "Tech uses like 'colonize markets' echo imperialism",
    alternative: "Use: enter new markets, expand reach",
    category: "legal"
  },
  // 日常对话表达
  {
    word: "You people",
    problematic: "Sounds accusatory and exclusionary",
    alternative: "Be specific: 'you guys,' 'your team'",
    category: "conversation"
  },
  {
    word: "Speak American",
    problematic: "Xenophobic, especially to immigrants",
    alternative: "Use: speak English (if necessary)",
    category: "conversation"
  },
  {
    word: "That's racist (as a joke)",
    problematic: "Trivializes actual racism",
    alternative: "Avoid unless it's serious critique",
    category: "conversation"
  },
  {
    word: "I'm colorblind (racial)",
    problematic: "Denies valid racial identity",
    alternative: "Better: 'I value all backgrounds'",
    category: "conversation"
  },
  {
    word: "All [race] look the same",
    problematic: "Dismissive, dehumanizing",
    alternative: "Never say this — focus on individuals",
    category: "conversation"
  },
  // 边缘案例词汇
  {
    word: "Minority (in isolation)",
    problematic: "Can feel diminishing or inaccurate",
    alternative: "Use: marginalized groups, underrepresented",
    category: "edge-case"
  },
  {
    word: "Slave terms in code (master branch, etc.)",
    problematic: "Rooted in racist systems",
    alternative: "Use: main branch, primary/replica",
    category: "edge-case"
  },
  {
    word: "Dark / black as synonyms for bad",
    problematic: "Symbolically ties color to moral value",
    alternative: "Use neutral words: negative, harmful",
    category: "edge-case"
  },
  {
    word: "Whitewashing (in media)",
    problematic: "Covers racial issues unfairly",
    alternative: "If accurate, use with care and explain",
    category: "edge-case"
  },
  // 地域歧视/地缘偏见
  {
    word: "Balkanize",
    problematic: "From violent regional conflict, implies ethnic division",
    alternative: "Fragment, divide",
    category: "geographic"
  },
  {
    word: "Gypsy (as a verb: 'to gypsy someone')",
    problematic: "Offensive to Romani people",
    alternative: "cheat, scam",
    category: "geographic"
  },
  {
    word: "Mexican time / Filipino time",
    problematic: "Mocks cultural perceptions of lateness",
    alternative: "Avoid – be specific or neutral",
    category: "geographic"
  },
  {
    word: "Chinese math",
    problematic: "Suggests Asians are 'naturally' better at math",
    alternative: "Use: advanced math, fast calculation",
    category: "geographic"
  },
  {
    word: "Indian time",
    problematic: "Used to belittle Indigenous time practices",
    alternative: "Be culturally respectful – use: flexible time",
    category: "geographic"
  },
  {
    word: "African village (used metaphorically)",
    problematic: "Exoticizes or mocks African cultures",
    alternative: "Use: rural, community, collective society",
    category: "geographic"
  },
  // 幽默/梗文化词汇
  {
    word: "Cancel culture (used to dismiss anti-racism)",
    problematic: "Often weaponized to shut down valid social critique",
    alternative: "Use: public accountability (if accurate)",
    category: "humor"
  },
  {
    word: "Race card",
    problematic: "Implies racial bias is fabricated",
    alternative: "Avoid entirely",
    category: "humor"
  },
  {
    word: "Welfare parade",
    problematic: "Mocks Black or immigrant families",
    alternative: "Do not use",
    category: "humor"
  },
  {
    word: "Diversity hire",
    problematic: "Implies someone only got job due to race",
    alternative: "Use: qualified candidate from underrepresented group",
    category: "humor"
  },
  {
    word: "Monkey (used about people)",
    problematic: "Heavily racist history, especially against Black people",
    alternative: "Never use in that context",
    category: "humor"
  },
  {
    word: "Gorilla (used metaphorically)",
    problematic: "Has been used in racist portrayals (e.g. sports)",
    alternative: "Use with extreme caution — context matters",
    category: "humor"
  },
  {
    word: "Jungle fever",
    problematic: "Sexualizes interracial relationships",
    alternative: "Avoid entirely",
    category: "humor"
  },
  // 多种族/身份歧视词汇
  {
    word: "Mutt",
    problematic: "Animalistic insult to mixed-race people",
    alternative: "biracial, multiracial person",
    category: "multiracial"
  },
  {
    word: "Mulatto",
    problematic: "Archaic term with slavery-era origin",
    alternative: "biracial person",
    category: "multiracial"
  },
  {
    word: "Yellowbone / redbone",
    problematic: "Colorist slang within communities",
    alternative: "Avoid unless self-identified and contextual",
    category: "multiracial"
  },
  {
    word: "High yellow",
    problematic: "Colorist and outdated",
    alternative: "Use: light-skinned (if necessary, with care)",
    category: "multiracial"
  },
  {
    word: "Passing",
    problematic: "Used to describe light-skinned people 'passing' as white - loaded term",
    alternative: "Use with full historical context or avoid",
    category: "multiracial"
  },
  // 移民旅行相关语言
  {
    word: "Invasion (for migration)",
    problematic: "Militarizes human movement",
    alternative: "influx, migration flow",
    category: "migration"
  },
  {
    word: "Illegals",
    problematic: "Dehumanizing label",
    alternative: "undocumented people",
    category: "migration"
  },
  {
    word: "Foreigners (used pejoratively)",
    problematic: "Can imply 'outsiders' in xenophobic tone",
    alternative: "international residents, newcomers",
    category: "migration"
  },
  {
    word: "They don't speak English",
    problematic: "Often said dismissively",
    alternative: "Phrase with curiosity or neutrality if needed",
    category: "migration"
  },
  // 具有生物种族主义根源的词汇
  {
    word: "Good genes",
    problematic: "Often used to praise Eurocentric features",
    alternative: "Use: strong traits, healthy attributes",
    category: "biological"
  },
  {
    word: "Blood purity / pure race",
    problematic: "Eugenics language",
    alternative: "Avoid entirely",
    category: "biological"
  },
  {
    word: "Strong bloodline",
    problematic: "Sometimes used in nationalist/racist contexts",
    alternative: "Use with care or avoid",
    category: "biological"
  },
  {
    word: "Breed (referring to humans)",
    problematic: "Animalizing language",
    alternative: "Use: family, heritage",
    category: "biological"
  },
  // 颜色象征偏见
  {
    word: "Black sheep",
    problematic: "Implies 'bad' = black",
    alternative: "Use: outlier, rebel (if not about race)",
    category: "color-symbolism"
  },
  {
    word: "Black market",
    problematic: "Criminalizes non-formal economies, color-coded",
    alternative: "Use: underground market",
    category: "color-symbolism"
  },
  {
    word: "Blackmail",
    problematic: "Negative connotation tied to 'black'",
    alternative: "Consider context, though less sensitive today",
    category: "color-symbolism"
  },
  {
    word: "White lie",
    problematic: "Harmless = white, harmful = dark",
    alternative: "Use: minor lie, small fib",
    category: "color-symbolism"
  },
  {
    word: "White savior",
    problematic: "Refers to stories where white people 'rescue' non-white — often patronizing",
    alternative: "Use responsibly in critique contexts only",
    category: "color-symbolism"
  },
  // 视觉/象征类表达中的偏见
  {
    word: "Colorblind (metaphor)",
    problematic: "Erases racial identity under 'equality' statement",
    alternative: "Say: 'I value diverse perspectives'",
    category: "visual-symbolic"
  },
  {
    word: "Hood (slang, 'he's from the hood')",
    problematic: "Often racialized as Black/poor/criminal",
    alternative: "Use specific neighborhood name",
    category: "visual-symbolic"
  },
  {
    word: "White is right",
    problematic: "Reinforces racial supremacy",
    alternative: "Avoid entirely",
    category: "visual-symbolic"
  },
  {
    word: "Black heart / black soul",
    problematic: "Ties darkness to evil, may reinforce bias",
    alternative: "Use: cold, cruel, unkind (contextually)",
    category: "visual-symbolic"
  },
  {
    word: "Whiteness (as standard)",
    problematic: "In fashion/beauty implies white = default",
    alternative: "Use: Eurocentric, traditional Western features",
    category: "visual-symbolic"
  },
  {
    word: "Blackfishing",
    problematic: "When non-Black influencers mimic Black features",
    alternative: "Use term only in critical explanation",
    category: "visual-symbolic"
  },
  {
    word: "Costume (e.g. ethnic costume)",
    problematic: "Treats cultural dress as entertainment",
    alternative: "Say: cultural attire, traditional clothing",
    category: "visual-symbolic"
  },
  {
    word: "Savage beauty / wild tribes (in fashion)",
    problematic: "Exoticizes non-Western cultures",
    alternative: "Avoid – use origin-specific or respectful terms",
    category: "visual-symbolic"
  },
  // 品牌、广告、时尚行业常见偏见用词
  {
    word: "Nude (only beige/tan products)",
    problematic: "Ignores other skin tones",
    alternative: "Say: skin-tone inclusive, warm beige, cocoa",
    category: "fashion-industry"
  },
  {
    word: "Ethnic hair",
    problematic: "Treats non-white hair as 'other'",
    alternative: "Say: textured hair, natural curls, 4C hair",
    category: "fashion-industry"
  },
  {
    word: "Ethnic food (used dismissively)",
    problematic: "Often labels non-Western cuisine as 'foreign'",
    alternative: "Say: Indian, Vietnamese, regional, etc.",
    category: "fashion-industry"
  },
  {
    word: "African print (used vaguely)",
    problematic: "Africa has 54 countries, generalized expression",
    alternative: "Say: West African wax print, Kente, etc.",
    category: "fashion-industry"
  },
  {
    word: "Oriental rug (outdated term)",
    problematic: "Colonial tone",
    alternative: "Use: Persian rug, Turkish rug, regional name",
    category: "fashion-industry"
  },
  {
    word: "World music",
    problematic: "Categorizes non-Western music as 'other'",
    alternative: "Say: Afrobeat, Latin pop, etc.",
    category: "fashion-industry"
  },
  // 教育/科研语境下的敏感词
  {
    word: "Slave (as metaphor, like 'data slave')",
    problematic: "Triggers racial trauma",
    alternative: "Use: worker process, secondary process",
    category: "education-research"
  },
  {
    word: "Tribe (e.g. 'research tribe')",
    problematic: "Overused and disrespectful in non-cultural use",
    alternative: "Use: group, cohort, team",
    category: "education-research"
  },
  {
    word: "Ethnic cleansing",
    problematic: "Use only in accurate genocide/human rights context",
    alternative: "Avoid metaphorical use entirely",
    category: "education-research"
  },
  {
    word: "Native informant",
    problematic: "Loaded term in post-colonial studies",
    alternative: "Use with context only; consider 'cultural liaison'",
    category: "education-research"
  },
  {
    word: "Orientalism",
    problematic: "Describes colonial-era racial ideology",
    alternative: "Only use in academic/critical context with explanation",
    category: "education-research"
  },
  {
    word: "Mestizo / Zambo",
    problematic: "Historical caste terms in Latin America",
    alternative: "Use: mixed-race Latin American, if needed, with care",
    category: "education-research"
  },
  // 跨文化语境中的"看似中立"但可能冒犯的词
  {
    word: "Coolie",
    problematic: "Used historically to demean Asian laborers",
    alternative: "Never use",
    category: "cross-cultural"
  },
  {
    word: "Mammy",
    problematic: "Racist stereotype of Black women caregivers",
    alternative: "Don't use; explain context only in history",
    category: "cross-cultural"
  },
  {
    word: "Uncle Tom",
    problematic: "Derogatory term for perceived submissive Black people",
    alternative: "Extremely offensive, avoid entirely",
    category: "cross-cultural"
  },
  {
    word: "Bantu (used vaguely)",
    problematic: "Refers to language group, but used as a derogatory term",
    alternative: "Use: Nguni, Zulu, etc. (specific ethnic terms)",
    category: "cross-cultural"
  },
  {
    word: "Japery / Chinaman",
    problematic: "Archaic, offensive colonial expressions",
    alternative: "Do not use",
    category: "cross-cultural"
  },
  {
    word: "Hottentot",
    problematic: "Colonial term for Khoikhoi women, now racist",
    alternative: "Use: Khoikhoi, if needed in anthropology",
    category: "cross-cultural"
  },
  {
    word: "Kaffir",
    problematic: "Highly offensive term in South Africa",
    alternative: "Never use, even in quote without context",
    category: "cross-cultural"
  }
]

export default function TermsTable() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [sortField, setSortField] = useState<'word' | 'category'>('word')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  // 筛选和排序逻辑
  const filteredAndSortedTerms = tableTerms
    .filter(term => {
      if (searchQuery.trim() === '') {
        // 如果搜索词为空，只按分类筛选
        const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory
        return matchesCategory
      }
      
      // 模糊搜索逻辑
      const query = searchQuery.toLowerCase().trim()
      const searchFields = [
        term.word.toLowerCase(),
        term.problematic.toLowerCase(),
        term.alternative.toLowerCase(),
        term.category.toLowerCase()
      ]
      
      // 检查是否任何字段包含搜索词
      const matchesSearch = searchFields.some(field => field.includes(query))
      
      // 分类筛选
      const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      const aValue = a[sortField].toLowerCase()
      const bValue = b[sortField].toLowerCase()
      const comparison = aValue.localeCompare(bValue)
      return sortDirection === 'asc' ? comparison : -comparison
    })

  // 分页逻辑
  const totalPages = Math.ceil(filteredAndSortedTerms.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const displayTerms = filteredAndSortedTerms.slice(startIndex, endIndex)

  // 分类选项
  const categories = [
    { id: 'all', name: 'All Categories', count: tableTerms.length },
    { id: 'severe', name: 'Severe Slurs', count: tableTerms.filter(t => t.category === 'severe').length },
    { id: 'moderate', name: 'Moderate Terms', count: tableTerms.filter(t => t.category === 'moderate').length },
    { id: 'stereotype', name: 'Stereotypes', count: tableTerms.filter(t => t.category === 'stereotype').length },
    { id: 'coded', name: 'Coded Language', count: tableTerms.filter(t => t.category === 'coded').length },
    { id: 'colonial', name: 'Colonial Terms', count: tableTerms.filter(t => t.category === 'colonial').length },
    { id: 'biased', name: 'Biased Phrases', count: tableTerms.filter(t => t.category === 'biased').length },
    { id: 'historical', name: 'Historical Bias', count: tableTerms.filter(t => t.category === 'historical').length },
    { id: 'media', name: 'Media & Pop Culture', count: tableTerms.filter(t => t.category === 'media').length },
    { id: 'workplace', name: 'Workplace Context', count: tableTerms.filter(t => t.category === 'workplace').length },
    { id: 'marketing', name: 'Marketing Language', count: tableTerms.filter(t => t.category === 'marketing').length },
    { id: 'legal', name: 'Legal & Government', count: tableTerms.filter(t => t.category === 'legal').length },
    { id: 'conversation', name: 'Conversational', count: tableTerms.filter(t => t.category === 'conversation').length },
    { id: 'edge-case', name: 'Edge Cases', count: tableTerms.filter(t => t.category === 'edge-case').length },
    { id: 'geographic', name: 'Geographic Bias', count: tableTerms.filter(t => t.category === 'geographic').length },
    { id: 'humor', name: 'Humor & Memes', count: tableTerms.filter(t => t.category === 'humor').length },
    { id: 'multiracial', name: 'Multiracial Identity', count: tableTerms.filter(t => t.category === 'multiracial').length },
    { id: 'migration', name: 'Migration & Travel', count: tableTerms.filter(t => t.category === 'migration').length },
    { id: 'biological', name: 'Biological Racism', count: tableTerms.filter(t => t.category === 'biological').length },
    { id: 'color-symbolism', name: 'Color Symbolism', count: tableTerms.filter(t => t.category === 'color-symbolism').length },
    { id: 'visual-symbolic', name: 'Visual & Symbolic', count: tableTerms.filter(t => t.category === 'visual-symbolic').length },
    { id: 'fashion-industry', name: 'Fashion & Industry', count: tableTerms.filter(t => t.category === 'fashion-industry').length },
    { id: 'education-research', name: 'Education & Research', count: tableTerms.filter(t => t.category === 'education-research').length },
    { id: 'cross-cultural', name: 'Cross-Cultural', count: tableTerms.filter(t => t.category === 'cross-cultural').length },
  ]

  const handleSort = (field: 'word' | 'category') => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategory('all')
    setCurrentPage(1)
  }

  const hasActiveFilters = searchQuery || selectedCategory !== 'all'

  // 当筛选条件改变时重置页码
  useEffect(() => {
    setCurrentPage(1)
  }, [searchQuery, selectedCategory, itemsPerPage])

  return (
    <section className="py-16 px-4 bg-neutral-50">
      <div className="container-responsive">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Racial Discrimination Terms & Stereotypes
          </h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            This comprehensive guide covers offensive slurs, problematic terms, and harmful stereotypes. 
            Understanding these terms helps promote awareness and inclusive communication.
          </p>
        </div>

        {/* 搜索和筛选 */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {/* 搜索框 */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search by word, meaning, alternative, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* 分类筛选 */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none bg-white border border-neutral-300 rounded-lg px-4 py-3 pr-8 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({category.count})
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none" />
            </div>

            {/* 清除筛选 */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="inline-flex items-center gap-2 px-4 py-3 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>
          
          {/* 搜索状态提示 */}
          {searchQuery.trim() !== '' && (
            <div className="text-center mt-4">
              <p className="text-sm text-neutral-600">
                Found {filteredAndSortedTerms.length} result{filteredAndSortedTerms.length !== 1 ? 's' : ''} for "{searchQuery}"
              </p>
            </div>
          )}
        </div>

        {/* 表格 */}
        <div className="max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-neutral-200">
                  <tr>
                    <th 
                      className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 cursor-pointer hover:bg-neutral-100 transition-colors"
                      onClick={() => handleSort('word')}
                    >
                      <div className="flex items-center gap-2">
                        Word
                        {sortField === 'word' && (
                          sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                      Why It's Problematic
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-neutral-900">
                      Suggested Alternative
                    </th>
                    <th 
                      className="px-6 py-4 text-left text-sm font-semibold text-neutral-900 cursor-pointer hover:bg-neutral-100 transition-colors"
                      onClick={() => handleSort('category')}
                    >
                      <div className="flex items-center gap-2">
                        Severity
                        {sortField === 'category' && (
                          sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200">
                  {displayTerms.map((term, index) => (
                    <tr key={index} className="hover:bg-neutral-50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="font-medium text-neutral-900">{term.word}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-neutral-700">{term.problematic}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-neutral-700">{term.alternative}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          term.category === 'severe' 
                            ? 'bg-red-100 text-red-800' 
                            : term.category === 'moderate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : term.category === 'stereotype'
                            ? 'bg-blue-100 text-blue-800'
                            : term.category === 'coded'
                            ? 'bg-purple-100 text-purple-800'
                            : term.category === 'colonial'
                            ? 'bg-orange-100 text-orange-800'
                            : term.category === 'biased'
                            ? 'bg-pink-100 text-pink-800'
                            : term.category === 'historical'
                            ? 'bg-gray-100 text-gray-800'
                            : term.category === 'media'
                            ? 'bg-indigo-100 text-indigo-800'
                            : term.category === 'workplace'
                            ? 'bg-teal-100 text-teal-800'
                            : term.category === 'marketing'
                            ? 'bg-cyan-100 text-cyan-800'
                            : term.category === 'legal'
                            ? 'bg-amber-100 text-amber-800'
                            : term.category === 'conversation'
                            ? 'bg-emerald-100 text-emerald-800'
                            : term.category === 'edge-case'
                            ? 'bg-slate-100 text-slate-800'
                            : term.category === 'geographic'
                            ? 'bg-lime-100 text-lime-800'
                            : term.category === 'humor'
                            ? 'bg-fuchsia-100 text-fuchsia-800'
                            : term.category === 'multiracial'
                            ? 'bg-violet-100 text-violet-800'
                            : term.category === 'migration'
                            ? 'bg-stone-100 text-stone-800'
                            : term.category === 'biological'
                            ? 'bg-rose-100 text-rose-800'
                            : term.category === 'color-symbolism'
                            ? 'bg-zinc-100 text-zinc-800'
                            : term.category === 'visual-symbolic'
                            ? 'bg-sky-100 text-sky-800'
                            : term.category === 'fashion-industry'
                            ? 'bg-amber-100 text-amber-800'
                            : term.category === 'education-research'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-neutral-100 text-neutral-800'
                        }`}>
                          {term.category}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* 表格底部 */}
            <div className="px-6 py-4 bg-neutral-50 border-t border-neutral-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="text-sm text-neutral-600">
                    Showing {startIndex + 1}-{Math.min(endIndex, filteredAndSortedTerms.length)} of {filteredAndSortedTerms.length} terms
                    {hasActiveFilters && ` (filtered from ${tableTerms.length} total)`}
                  </div>
                  
                  {/* 每页显示数量选择器 */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-neutral-600">Show:</span>
                    <select
                      value={itemsPerPage}
                      onChange={(e) => setItemsPerPage(Number(e.target.value))}
                      className="text-sm border border-neutral-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value={10}>10</option>
                      <option value={20}>20</option>
                      <option value={50}>50</option>
                      <option value={100}>100</option>
                    </select>
                    <span className="text-sm text-neutral-600">per page</span>
                  </div>
                </div>
                
                {/* 分页控制 */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 text-sm text-neutral-600 hover:text-neutral-900 disabled:text-neutral-400 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    
                    <div className="flex items-center gap-1">
                      {(() => {
                        const pages = []
                        const maxVisiblePages = 7
                        
                        if (totalPages <= maxVisiblePages) {
                          // 如果总页数不多，显示所有页码
                          for (let i = 1; i <= totalPages; i++) {
                            pages.push(i)
                          }
                        } else {
                          // 如果总页数很多，显示部分页码
                          if (currentPage <= 4) {
                            // 当前页在前几页
                            for (let i = 1; i <= 5; i++) {
                              pages.push(i)
                            }
                            pages.push('...')
                            pages.push(totalPages)
                          } else if (currentPage >= totalPages - 3) {
                            // 当前页在后几页
                            pages.push(1)
                            pages.push('...')
                            for (let i = totalPages - 4; i <= totalPages; i++) {
                              pages.push(i)
                            }
                          } else {
                            // 当前页在中间
                            pages.push(1)
                            pages.push('...')
                            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                              pages.push(i)
                            }
                            pages.push('...')
                            pages.push(totalPages)
                          }
                        }
                        
                        return pages.map((page, index) => (
                          <button
                            key={index}
                            onClick={() => typeof page === 'number' && setCurrentPage(page)}
                            disabled={typeof page !== 'number'}
                            className={`px-3 py-1 text-sm rounded ${
                              typeof page === 'number'
                                ? currentPage === page
                                  ? 'bg-primary-600 text-white'
                                  : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                                : 'text-neutral-400 cursor-default'
                            }`}
                          >
                            {page}
                          </button>
                        ))
                      })()}
                    </div>
                    
                    <button
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 text-sm text-neutral-600 hover:text-neutral-900 disabled:text-neutral-400 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 教育说明 */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Educational Purpose
            </h3>
            <p className="text-blue-800">
              This table is presented for educational purposes only. Understanding these terms helps 
              identify and avoid harmful language, promoting more inclusive and respectful communication. 
              These terms should never be used in conversation or writing.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 