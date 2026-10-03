// Everything Sete says in his name. Quotes are his published words, kept
// exactly as reported — including his interview English ("consistence",
// "I don't produce nothing"); tidying them would make them misquotes.
// Anything that only lives on quote sites has been left out.
// `rest: true` puts a quote in the pool shown during long rests.

export const QUOTES = [
  // work ethic
  { id: 'work', text: 'Talent without work is nothing and work without talent is nothing. They have to work together at the same time. I have both.', source: 'WHOOP Podcast, 2024', rest: true },
  { id: 'everyone', text: 'Everyone wants to be Cristiano, but doing it is difficult.', source: 'WHOOP Podcast, 2024', rest: true },
  { id: 'discipline', text: 'Discipline is the most difficult thing.', source: 'WHOOP Podcast, 2024', rest: true },
  { id: 'consistency-hard', text: 'Consistency is the most difficult thing.', source: 'WHOOP Podcast, 2024', rest: true },
  { id: 'mind', text: 'I fight against my mind sometimes, we are all human beings. Of course, I don’t like going to the gym every day, no one does, but you have to do it.', source: 'WHOOP Podcast, 2024', rest: true },
  { id: 'skies', text: 'Nothing falls from the skies. I would never have arrived where I am without the hard work.', source: 'France Football, 2019', rest: true },
  { id: 'football24', text: 'I live football 24 hours, let’s say in that way, to do the right things to perform.', source: 'Piers Morgan Uncensored, 2025', rest: true },
  { id: 'consistence', text: 'If you have consistence, it’s easy, trust me.', source: 'Piers Morgan Uncensored, 2025', rest: true },
  { id: 'only-i-know', text: 'Only I know… how hard it is to work every day, to be physically and psychologically fit, to score 900 goals.', source: 'after his 900th goal, 2024', rest: true },
  { id: 'records', text: 'I don’t break records… they haunt me!', source: 'after his 900th goal, 2024', rest: true },

  // self-belief
  { id: 'best-history', text: 'I am the best player in history, in both good and bad times.', source: 'France Football, 2017' },
  { id: 'competitive', text: 'I’m so competitive that sometimes I forget what I’ve achieved.', source: 'La Sexta, 2025', rest: true },
  { id: 'different', text: 'I’m different, full stop.', source: 'La Sexta, 2025', rest: true },
  { id: 'never-seen', text: 'I play well with my head, I take good free kicks, I am fast, I am strong, I jump… I have never seen anyone better than me.', source: 'La Sexta, eve of his 40th birthday, 2025' },

  // noise
  { id: 'criticize', text: 'People criticize me a lot. As I say, I don’t care about that. Because when you feel your conscience is good, free, you know you don’t have to be worried about what the people say.', source: 'Piers Morgan Uncensored, 2025', rest: true },
  { id: 'mask', text: 'Sometimes, you have to put on a mask. You cannot smile every time for all the people.', source: 'CNN, 2012' },

  // longevity
  { id: 'young', text: 'My goal is to stay young as I get older, to stay competitive.', source: 'France Football, 2019', rest: true },
  { id: 'after30', text: 'I scored more goals after 30.', source: 'Piers Morgan Uncensored, 2025', rest: true },
  { id: 'passion', text: 'When you have passion for what you’re doing, you cannot be worried about how you’re feeling.', source: 'UR · Cristiano, with Rio Ferdinand, 2024', rest: true },
  { id: 'pack-bags', text: 'The day that I start to feel I don’t produce nothing, I’ll pack my bags and I’ll go away.', source: 'UR · Cristiano, with Rio Ferdinand, 2024', rest: true },
  { id: 'ready-more', text: 'It’s very hard to play more, but my passion is high, and I’m ready to play more.', source: 'Globe Soccer Awards, 2025', rest: true },
  { id: 'same-passion', text: 'A new chapter begins. Same passion, same dream.', source: 'on extending with Al-Nassr, 2025', rest: true },
  { id: 'sacrifice', text: 'Because after all it’s been 25 years with a lot of sacrifice.', source: 'Vogue, 2026' },

  // recovery
  { id: 'recover', text: 'I sleep good, I do it good routines. I do it a good recover.', source: 'Piers Morgan Uncensored, 2025', rest: true },

  // roots
  { id: 'left-family', text: 'It was hard to left my family in Madeira, to follow my dream in Lisbon.', source: 'WHOOP Podcast, 2024' },
  { id: 'father', text: 'To be number one and he doesn’t see it. He doesn’t see me receive awards.', source: 'on his late father, ITV, 2019' },
  { id: 'family', text: 'What we take from this life, it’s family and friends, you know, relationships.', source: 'Piers Morgan Uncensored, 2025' },
  { id: 'god', text: 'God puts you in a place where you deserve.', source: 'Piers Morgan Uncensored, 2025' },

  // the shirt
  { id: 'euro', text: 'I’ve always said I wanted to win a trophy with the national team and make history. And I did it.', source: 'after the Euro 2016 final' },
  { id: 'sadness', text: 'Sadness at the start is joy at the end. That’s what football is.', source: 'Euro 2024, after the Slovenia shoot-out', rest: true },
  { id: 'siu', text: 'It means yes — very simple but meaning it strongly!', source: 'on “Siuuu”, 2023' },
];

// The Code: seven principles, each anchored to his own words.
export const LAWS = [
  { title: 'Talent is the start', quote: 'work',
    why: 'He has never pretended it was only graft. But the gift alone gets nobody to two decades at the top. Show up as if you have no talent at all.' },
  { title: 'Discipline is the hard part', quote: 'discipline',
    why: 'The sessions are not the difficult bit. Doing them on the days you don’t feel like it is. That is the whole program.' },
  { title: 'Consistency makes it easy', quote: 'consistence',
    why: 'Seven sessions done is worth more than one heroic one. The streak is the point — protect it.' },
  { title: 'Fight your own mind', quote: 'mind',
    why: 'Even he doesn’t want to go some days. He goes anyway. Expect the resistance; don’t negotiate with it.' },
  { title: 'Recovery is training', quote: 'recover',
    why: 'Sleep, cold water, rest days. He treats recovery as part of the work, not a break from it.' },
  { title: 'Ignore the noise', quote: 'criticize',
    why: 'If you did the work, you know. Nobody else’s opinion changes the rep count.' },
  { title: 'Stay hungry', quote: 'competitive',
    why: 'Finish chapter seven, then start again from chapter one. There is always another number.' },
];

// The routine. What he has said himself, and what has been reliably reported.
export const HABITS = [
  { title: 'Football, all day', text: 'He describes living the job around the clock — food, sleep and training all aimed at the next performance.', source: 'Piers Morgan Uncensored, 2025' },
  { title: 'Weights two or three times a week', text: '“Two times per week for me is enough.” Not every day — the rest is football, mobility and recovery.', source: 'Piers Morgan Uncensored, 2025' },
  { title: 'Cold plunge, daily', text: '“Cold plunge every day because it’s part of my routine.”', source: 'WHOOP Podcast, 2024' },
  { title: 'Sleep, tracked', text: 'Consistent sleep is the base of his routine; he tracks it on a wearable and has called it “like to have a doctor in your wrist.”', source: 'WHOOP Podcast, 2024' },
  { title: 'Small meals, plain food', text: 'Frequent, simple meals built on fish, chicken, eggs and salad. Teammates who went to lunch reported plain chicken and water, then more training.', source: 'Patrice Evra on ITV, 2018 · reported diet, 2020' },
  { title: 'No alcohol', text: 'He doesn’t drink. His father died of an alcohol-related illness when Cristiano was 20.', source: 'BBC, 2010' },
  { title: 'Água', text: 'At a Euro 2020 press conference he moved two soft-drink bottles aside, held up water and said one word: “Água.”', source: 'ESPN, 2021' },
  { title: 'No tattoos', text: 'He has none — he gives blood and has donated bone marrow, which tattoos would interrupt.', source: 'widely reported' },
];

export const HERITAGE_INTRO = 'The youngest of four, from a crowded house in Santo António, Madeira. Everything after that, he built.';

export const TIMELINE = [
  { year: '1985', place: 'Funchal, Madeira', key: true,
    text: 'Born 5 February, Cristiano Ronaldo dos Santos Aveiro. Raised in Santo António, sharing a room with his brother and two sisters. His mother Dolores cooked and cleaned; his father José Dinis was a municipal gardener.' },
  { year: '1992', place: 'CF Andorinha',
    text: 'His first club, where his father worked as kit man. Small and quick — “Abelhinha,” the little bee — and he cried when he lost.' },
  { year: '1997', place: 'Lisboa · Sporting CP', key: true,
    text: 'Twelve years old. A three-day trial, a £1,500 fee, and a move to Lisbon on his own.', quote: 'left-family' },
  { year: '2000', place: 'Lisboa',
    text: 'As a teenager he was diagnosed with a racing heart and had surgery to fix it. He was out of hospital within hours and training again within days.' },
  { year: '2002', place: 'Sporting first team',
    text: 'Debut at 17. Two goals against Moreirense that October.' },
  { year: '2003', place: 'Manchester United', key: true,
    text: 'Signed at 18 after tearing United apart in a friendly. Handed the number seven worn by Best, Cantona and Beckham. A week later, his Portugal debut.' },
  { year: '2005', place: 'Loss',
    text: 'His father died at 52, of an alcohol-related illness. Cristiano was 20.', quote: 'father' },
  { year: '2008', place: 'Manchester · Moscow',
    text: 'Champions League winner and his first Ballon d’Or, at 23.' },
  { year: '2009', place: 'Real Madrid', key: true,
    text: 'A world-record transfer. Nine seasons, four Champions Leagues, four more Ballons d’Or — five in all.' },
  { year: '2016', place: 'Paris · Seleção', key: true,
    text: 'Captain at Euro 2016. Forced off injured early in the final, he spent the rest of it on the touchline. Portugal won.', quote: 'euro' },
  { year: '2018', place: 'Juventus',
    text: 'A new league at 33. Two Serie A titles. Top scorer in England, Spain and Italy — and later Saudi Arabia, the first to do it in four.' },
  { year: '2023', place: 'Al-Nassr, Riyadh',
    text: 'Signed at 37. The next season, a league-record 35 goals.' },
  { year: '2024', place: 'Lisboa', key: true,
    text: 'Goal 900, against Croatia. He went to his knees in tears.', quote: 'only-i-know' },
  { year: '2025', place: 'Munich · Seleção',
    text: 'Scored the equaliser in the Nations League final against Spain; Portugal won on penalties. His second Nations League.' },
  { year: '2026', place: 'Riyadh · the World Cup', key: true,
    text: 'At 41: the Saudi Pro League title, then a sixth World Cup — the first man to score at six. The most caps and international goals in men’s football history.', quote: 'sacrifice' },
];
