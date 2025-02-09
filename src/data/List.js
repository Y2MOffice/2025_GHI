// import img1 from "../assets/1.png";
// import img2 from "../assets/2.png";
// import img3 from "../assets/3.png";
// import img4 from "../assets/4.png";
// import img5 from "../assets/5.png";

let data = [
  {
    id: 0,
    title: "이상해씨",
    content: "태어나서 얼마 동안 등의 씨앗에 담긴 영양을 섭취하며 자란다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000101.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000101.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000201.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000301.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000302.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000303.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 1,
    title: "파이리",
    content:
      "꼬리에서 타오르는 불꽃은 생명력의 상징. 기운이 없으면 불꽃이 약해진다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000401.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000401.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000501.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000601.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000602.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000603.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000604.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 2,
    title: "꼬부기",
    content:
      "태어난 뒤 등이 부풀면서 단단한 등껍질이 생긴다. 입에서 강력한 거품을 발사한다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000701.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000701.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000801.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000901.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000902.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/000903.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 3,
    title: "캐터피",
    content:
      "빨간 더듬이로부터 냄새를 내어 상대를 쫓아 버린다. 탈피를 반복하여 자라난다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001001.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001001.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001101.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001201.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001202.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 4,
    title: "뿔충이",
    content:
      "매일 자신과 똑같은 무게의 잎사귀를 먹는다. 머리의 침으로 달려드는 상대를 물리친다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001301.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001301.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001401.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001501.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001502.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 5,
    title: "구구",
    content:
      "싸움을 좋아하지 않는 얌전한 성격이지만 어설프게 건드리면 강력한 반격을 당하게 된다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001601.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001601.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001701.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001801.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001802.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 6,
    title: "구구",
    content:
      "어떤 장소에도 정착하여 살아갈 수 있는 생명력이 있다. 경계심이 매우 강하다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001901.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001901.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/001902.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002001.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002002.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 7,
    title: "깨비참",
    content:
      "작은 날개를 쉴 새 없이 파닥여 날아오른다. 풀밭에 있는 먹이를 부리로 찾아낸다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002101.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002101.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002201.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002201.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 8,
    title: "아보",
    content:
      "자유롭게 턱을 뺄 수 있어서 큰 먹이도 삼킬 수 있지만 무거워져서 움직일 수 없게 된다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002301.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002301.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002401.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002401.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 9,
    title: "피카츄",
    content:
      "양 볼에는 전기를 저장하는 주머니가 있다. 화가 나면 저장한 전기를 단숨에 방출한다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002501.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002501.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002502.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002601.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002602.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 10,
    title: "모래두지",
    content:
      "깊은 구멍을 파서 생활한다. 위험이 닥치면 몸을 말아 상대의 공격을 가만히 견딘다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002701.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002701.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002702.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002801.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002802.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 11,
    title: "니드런♀",
    content:
      "싸움을 좋아하지 않는 성격이다. 독침에서 분비된 독은 한 방울만 맞아도 생명을 빼앗긴다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002901.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/002901.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/003001.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/003101.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 12,
    title: "니드런♂",
    content:
      "풀밭 위로 귀만 내놓고 주위의 낌새를 살핀다. 맹독의 뿔로 몸을 보호한다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/003201.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/003201.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/003301.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/003401.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 13,
    title: "삐삐",
    content:
      "삐삐들은 보름달 밤에 어디에서 왔는지도 모르게 모여 춤춘다. 달빛을 받으면 떠오른다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/003501.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/003501.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/003601.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/003601.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 14,
    title: "식스테일",
    content:
      "자신보다 강한 상대에게 공격을 받으면 다친 척을 해서 속이고 그 틈을 타서 도망친다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/003701.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/003701.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/003702.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/003801.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/003802.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 15,
    title: "푸린",
    content:
      "초롱초롱한 눈동자가 흔들릴 때 졸음이 쏟아지게 하는 이상하고 기분 좋은 노래를 부른다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/003901.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/003901.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/004001.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/004001.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 16,
    title: "주뱃",
    content:
      "입에서 내는 초음파로 두 눈이 없어도 주위의 장애물을 탐색할 수 있다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/004101.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/004101.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/004201.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/004201.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 17,
    title: "뚜벅쵸",
    content:
      "별명은 걸어 다니는 독초. 밤이 되면 2개의 뿌리로 300m나 걷는다고 한다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/004301.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/004301.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/004401.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/004501.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 18,
    title: "파라스",
    content:
      "동충하초라고 불리는 버섯을 등에 기르고 있다. 파라스와 함께 크게 자란다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/004601.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/004601.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/004701.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/004701.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  },
  {
    id: 19,
    title: "콘팡",
    content:
      "전신에서 독이 스며 나온다. 어두워지면 밝은 곳에 모인 작은 벌레포켓몬을 잡아먹는다.",
    mainImg: "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/004801.png",
    img: [
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/004801.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/004901.png",
      "https://data1.pokemonkorea.co.kr/newdata/pokedex/mid/004901.png",
    ],
    tags: ["임시1", "임시2", "임시3", "임시4"],
    summary: "임시",
    price: 10000,
  }
];

export default data;
