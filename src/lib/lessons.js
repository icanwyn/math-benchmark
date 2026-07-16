import { DOMAINS } from './questionBank'

/**
 * Comprehensive mini-unit lessons keyed by domain (grades 3–6).
 * Section types: hook | vocab | teach | strategy | example | mistakes | practice | check | summary
 */
export const LESSONS = {
  operations: {
    title: 'Mastering Operations',
    emoji: '➕',
    minutes: 15,
    sections: [
      {
        type: 'hook',
        title: 'Why Operations Matter',
        body: 'Every time you share snacks, figure out game scores, or check if you have enough money for two toys, you are using operations!\n\nAddition, subtraction, multiplication, and division are like four superpowers. Once you know how they work together, bigger math problems feel much smaller. Today we build those powers step by step.',
      },
      {
        type: 'vocab',
        title: 'Key Vocabulary',
        terms: [
          { term: 'Sum', definition: 'The answer when you add. In 7 + 5 = 12, the sum is 12.' },
          { term: 'Difference', definition: 'The answer when you subtract. In 15 − 6 = 9, the difference is 9.' },
          { term: 'Product', definition: 'The answer when you multiply. In 4 × 8 = 32, the product is 32.' },
          { term: 'Quotient', definition: 'The answer when you divide. In 24 ÷ 6 = 4, the quotient is 4.' },
          { term: 'Factor', definition: 'A number you multiply. In 6 × 7, both 6 and 7 are factors.' },
          { term: 'Order of operations', definition: 'The correct order to solve mixed expressions: parentheses first, then × and ÷ left to right, then + and − left to right (PEMDAS).' },
        ],
      },
      {
        type: 'teach',
        title: 'Addition & Subtraction Foundations',
        body: 'Start with place value. Break numbers into tens and ones so your brain has less to juggle.\n\nExample idea: 47 + 36\n• Tens: 40 + 30 = 70\n• Ones: 7 + 6 = 13\n• Combine: 70 + 13 = 83\n\nFor subtraction, you can count up from the smaller number to the larger one. To solve 63 − 48, count from 48 to 63: from 48 to 50 is 2, from 50 to 63 is 13, and 2 + 13 = 15. So 63 − 48 = 15.\n\nRegrouping (borrowing) just means trading 1 ten for 10 ones when the ones place is too small.',
      },
      {
        type: 'teach',
        title: 'Multiplication: Equal Groups',
        body: 'Multiplication means equal groups. 6 × 4 can mean 6 groups of 4, or 4 groups of 6 — both equal 24.\n\nHelpful strategies:\n• Skip-count: 4, 8, 12, 16, 20, 24 for 6 × 4\n• Known facts: if you know 6 × 5 = 30, then 6 × 6 = 36\n• Doubling: 8 × 7 = (8 × 5) + (8 × 2) = 40 + 16 = 56\n• Arrays: rows and columns make products easy to see\n\nFact families connect operations: 6 × 4 = 24, 4 × 6 = 24, 24 ÷ 6 = 4, 24 ÷ 4 = 6.',
      },
      {
        type: 'teach',
        title: 'Division & Order of Operations',
        body: 'Division undoes multiplication. If 8 × 7 = 56, then 56 ÷ 8 = 7.\n\nThink of division as:\n• Sharing equally: 56 cookies shared among 8 friends → each gets 7\n• Measuring how many groups: How many groups of 8 fit into 56? → 7 groups\n\nWhen +, −, ×, and ÷ appear together, follow PEMDAS:\n1. Parentheses ( )\n2. Exponents (when you see them later)\n3. Multiply and Divide, left to right\n4. Add and Subtract, left to right\n\nRemember: × and ÷ are the same priority — go left to right. Same for + and −.',
      },
      {
        type: 'strategy',
        title: 'Strategy: Solve Any Operations Problem',
        steps: [
          'Read the expression carefully and write it down.',
          'Circle parentheses or any grouped parts first.',
          'Do all multiplication and division from left to right.',
          'Do all addition and subtraction from left to right.',
          'Double-check with the inverse operation (e.g., if you multiplied, divide to verify).',
          'Ask: Does my answer make sense? (Bigger when multiplying larger numbers? Smaller when dividing?)',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 1: Break-Apart Multiplication',
        body: 'Problem: What is 8 × 7?',
        steps: [
          'Break 7 into friendly parts: 5 + 2.',
          'Compute 8 × 5 = 40 (skip-count by 5 eight times, or use a known fact).',
          'Compute 8 × 2 = 16 (double 8).',
          'Add the parts: 40 + 16 = 56.',
          'Why it works: 8 × (5 + 2) = (8 × 5) + (8 × 2). That is the distributive property — you are just regrouping equal groups.',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 2: Order of Operations',
        body: 'Problem: What is 3 + 4 × 5?',
        steps: [
          'Scan for parentheses: none.',
          'Multiply before adding: 4 × 5 = 20.',
          'Then add: 3 + 20 = 23.',
          'Why not 35? If you add first you get (3 + 4) × 5 = 35, but there are no parentheses telling you to add first.',
          'Check: Multiplication creates 4 groups of 5, then you add 3 more → 23 makes sense.',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 3: Two-Step Expression',
        body: 'Problem: What is (12 + 8) ÷ 4 × 3?',
        steps: [
          'Parentheses first: 12 + 8 = 20. Now you have 20 ÷ 4 × 3.',
          'Division and multiplication left to right: 20 ÷ 4 = 5.',
          'Then: 5 × 3 = 15.',
          'Why left to right? ÷ and × share priority, so you do not multiply first just because it is multiplication.',
          'Check: 20 shared into 4 equal parts is 5, and three of those parts is 15.',
        ],
      },
      {
        type: 'mistakes',
        title: 'Common Mistakes',
        items: [
          {
            wrong: 'Always going left to right: 3 + 4 × 5 = 35',
            right: 'Multiply first: 3 + 4 × 5 = 3 + 20 = 23',
            fix: 'Use PEMDAS. × and ÷ beat + and − unless parentheses say otherwise.',
          },
          {
            wrong: 'Mixing up 56 ÷ 8 and 8 ÷ 56',
            right: '56 ÷ 8 = 7 because 8 × 7 = 56',
            fix: 'Ask: “How many groups of the second number fit into the first?”',
          },
          {
            wrong: 'Forgetting to regroup when ones are too small in subtraction',
            right: 'In 63 − 48, trade 1 ten for 10 ones so 13 − 8 works',
            fix: 'If the top ones digit is smaller, borrow from the tens place first.',
          },
        ],
      },
      {
        type: 'practice',
        title: 'Guided Practice',
        problems: [
          { q: '45 + 28 = ?', a: '73', hint: 'Add tens (40+20), then ones (5+8), then combine.' },
          { q: '9 × 6 = ?', a: '54', hint: 'Think 9 × 5 = 45, then add one more 9.' },
          { q: '2 + 5 × 3 = ?', a: '17', hint: 'Multiply 5 × 3 first, then add 2.' },
          { q: '72 ÷ 8 = ?', a: '9', hint: 'What times 8 equals 72?' },
          { q: '(10 − 4) × 3 = ?', a: '18', hint: 'Parentheses first: 10 − 4 = 6.' },
          { q: '100 − 36 = ?', a: '64', hint: 'Count up from 36 to 100, or subtract tens then ones.' },
        ],
      },
      {
        type: 'check',
        title: 'Check for Understanding',
        problems: [
          {
            q: 'Why is 6 + 2 × 4 equal to 14, not 32?',
            a: '14',
            explanation: 'Multiply first: 2 × 4 = 8, then 6 + 8 = 14. You only get 32 if you add first inside hidden parentheses that are not there.',
          },
          {
            q: 'If 7 × 8 = 56, what is 56 ÷ 7?',
            a: '8',
            explanation: 'Division undoes multiplication. Since 7 groups of 8 make 56, 56 ÷ 7 = 8.',
          },
          {
            q: 'Explain one way to solve 6 × 9 without memorizing only the fact.',
            a: '54 (e.g. 6×10 − 6)',
            explanation: 'One strong method: 6 × 10 = 60, then subtract one group of 6 → 60 − 6 = 54. Other methods: 6 × 5 + 6 × 4, or skip-counting by 6 nine times.',
          },
        ],
      },
      {
        type: 'summary',
        title: 'Quick Review & Takeaways',
        body: '⭐ Break big numbers into tens and ones.\n⭐ Multiplication = equal groups; division undoes it.\n⭐ PEMDAS: parentheses → ×÷ left to right → +− left to right.\n⭐ Use known facts and the distributive property to build harder facts.\n⭐ Always ask: Does my answer make sense?\n\nYou are building real math power — keep practicing a few facts each day!',
      },
    ],
  },

  placeValue: {
    title: 'Place Value Power',
    emoji: '🔢',
    minutes: 14,
    sections: [
      {
        type: 'hook',
        title: 'Why Place Value Matters',
        body: 'The digit 5 can mean 5, 50, 500, or 5,000 — it all depends on where it sits!\n\nPlace value is the secret code behind reading big numbers, comparing prices, rounding, and estimating. Once you crack the code, huge numbers stop being scary and start being organized.',
      },
      {
        type: 'vocab',
        title: 'Key Vocabulary',
        terms: [
          { term: 'Digit', definition: 'A single symbol 0–9. Numbers are built from digits.' },
          { term: 'Place value', definition: 'The value of a digit based on its position (ones, tens, hundreds, thousands…).' },
          { term: 'Standard form', definition: 'The usual way to write a number, like 3,482.' },
          { term: 'Expanded form', definition: 'Writing a number as the sum of its place values, like 3,000 + 400 + 80 + 2.' },
          { term: 'Rounding', definition: 'Finding a nearby number that is easier to work with, based on a place (nearest ten, hundred…).' },
          { term: 'Estimate', definition: 'A smart approximation using rounded numbers to check if an answer is reasonable.' },
        ],
      },
      {
        type: 'teach',
        title: 'How Place Value Works',
        body: 'Each place is 10 times the place to its right.\n\nIn 3,482:\n• 3 is in the thousands → 3 × 1,000 = 3,000\n• 4 is in the hundreds → 4 × 100 = 400\n• 8 is in the tens → 8 × 10 = 80\n• 2 is in the ones → 2 × 1 = 2\n\nSo 3,482 = 3,000 + 400 + 80 + 2.\n\nTip: Say the place names out loud as you point to each digit from left to right. That habit prevents mix-ups on tests.',
      },
      {
        type: 'teach',
        title: 'Comparing & Ordering Numbers',
        body: 'To compare two numbers:\n1. Look at how many digits they have — more digits usually means larger (for whole numbers).\n2. Start from the left (highest place) and compare digit by digit.\n3. The first place where the digits differ decides which number is larger.\n\nExample: Compare 4,582 and 4,528.\n• Thousands: both 4\n• Hundreds: both 5\n• Tens: 8 vs 2 → 8 is greater, so 4,582 > 4,528\n\nSymbols: > means greater than, < means less than, = means equal.',
      },
      {
        type: 'teach',
        title: 'Rounding Like a Pro',
        body: 'Rounding finds a nearby “friendly” number.\n\nSteps to round to a place:\n1. Find the digit in the place you are rounding to.\n2. Look at the digit one place to its right (the “bossy neighbor”).\n3. If the neighbor is 0–4, keep the rounding digit the same (round down / stay).\n4. If the neighbor is 5–9, add 1 to the rounding digit (round up).\n5. Change all digits to the right of the rounding place to 0.\n\nExamples:\n• Nearest ten: look at ones\n• Nearest hundred: look at tens\n• Nearest thousand: look at hundreds',
      },
      {
        type: 'strategy',
        title: 'Strategy: Round Any Whole Number',
        steps: [
          'Underline the place you are rounding to (e.g., the hundreds digit).',
          'Circle the digit immediately to the right — that is your decision digit.',
          'If the decision digit is 0–4, keep the underlined digit. If it is 5–9, add 1 to the underlined digit.',
          'Turn every digit to the right of the underlined place into 0.',
          'If adding 1 causes a 9 to become 10, carry into the next place (e.g., 396 to the nearest ten → 400).',
          'Read your rounded number and check it is close to the original.',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 1: Reading Place Value',
        body: 'Problem: In 5,914, which digit is in the hundreds place? What is its value?',
        steps: [
          'Write the places under the digits: 5 thousands, 9 hundreds, 1 ten, 4 ones.',
          'The hundreds digit is 9.',
          'Its value is 9 × 100 = 900 (not just “9”).',
          'Why it matters: The digit and its value are different. 9 in the hundreds place is worth 900.',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 2: Round to the Nearest Hundred',
        body: 'Problem: Round 3,672 to the nearest hundred.',
        steps: [
          'The hundreds digit is 6 (in 3,672).',
          'The decision digit is the tens digit: 7.',
          '7 is 5 or greater, so round up: 6 becomes 7.',
          'Digits to the right become 0: 3,700.',
          'Why it works: 3,672 is closer to 3,700 than to 3,600 because it is past the halfway mark 3,650.',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 3: Round Across a Nine',
        body: 'Problem: Round 2,960 to the nearest hundred.',
        steps: [
          'Hundreds digit is 9; decision digit (tens) is 6.',
          '6 ≥ 5, so round up the 9.',
          '9 + 1 = 10, so the hundreds become 0 and you carry 1 into the thousands.',
          '2,000 + 1,000 = 3,000. Answer: 3,000.',
          'Check: 2,960 is only 40 away from 3,000, and 60 away from 2,900 — yes, nearer to 3,000.',
        ],
      },
      {
        type: 'mistakes',
        title: 'Common Mistakes',
        items: [
          {
            wrong: 'Saying the hundreds digit “9” means the value is 9',
            right: 'In 5,914 the hundreds digit 9 has value 900',
            fix: 'Always multiply the digit by its place (9 × 100).',
          },
          {
            wrong: 'Looking at the wrong neighbor when rounding',
            right: 'Round to tens → look at ones; round to hundreds → look at tens',
            fix: 'The decision digit is always one place to the right of your target place.',
          },
          {
            wrong: 'Forgetting to zero out digits after rounding',
            right: '3,672 to nearest hundred is 3,700 not 3,67',
            fix: 'After deciding up or stay, replace all right-hand digits with zeros.',
          },
        ],
      },
      {
        type: 'practice',
        title: 'Guided Practice',
        problems: [
          { q: 'In 5,914, which digit is in the hundreds place?', a: '9', hint: 'Places from the right: ones, tens, hundreds, thousands.' },
          { q: 'Write 4,206 in expanded form.', a: '4,000 + 200 + 6', hint: 'Multiply each digit by its place value.' },
          { q: 'Round 846 to the nearest ten.', a: '850', hint: 'Look at the ones digit (6).' },
          { q: 'Round 2,350 to the nearest hundred.', a: '2,400', hint: 'Look at the tens digit (5) — 5 rounds up.' },
          { q: 'Which is greater: 7,089 or 7,809?', a: '7,809', hint: 'Compare hundreds: 0 vs 8.' },
          { q: 'What is the value of the 3 in 3,572?', a: '3,000', hint: 'The 3 is in the thousands place.' },
        ],
      },
      {
        type: 'check',
        title: 'Check for Understanding',
        problems: [
          {
            q: 'Round 4,955 to the nearest hundred. Explain the carry.',
            a: '5,000',
            explanation: 'Hundreds digit is 9; tens digit is 5 so round up. 9 + 1 carries into the thousands → 5,000.',
          },
          {
            q: 'Why is 6,402 closer to 6,400 than to 6,500 when rounding to the nearest hundred?',
            a: 'Because the tens digit is 0 (less than 5)',
            explanation: 'Halfway between 6,400 and 6,500 is 6,450. Since 6,402 is below that, it rounds to 6,400.',
          },
          {
            q: 'What is the value of 7 in 70,215?',
            a: '70,000',
            explanation: '7 is in the ten-thousands place: 7 × 10,000 = 70,000.',
          },
        ],
      },
      {
        type: 'summary',
        title: 'Quick Review & Takeaways',
        body: '⭐ Each place is worth 10× the place to its right.\n⭐ Digit ≠ value (5 in tens place is 50).\n⭐ Compare from the left (biggest place first).\n⭐ Rounding: look one place right — 0–4 stay, 5–9 up, then zeros.\n⭐ Expanded form shows the hidden place values.\n\nPlace value is the foundation for almost all number work — you have got this!',
      },
    ],
  },

  fractions: {
    title: 'Fraction Friends',
    emoji: '🍕',
    minutes: 15,
    sections: [
      {
        type: 'hook',
        title: 'Why Fractions Matter',
        body: 'Pizza slices, measuring cups, game progress bars, and “half off” sales all use fractions!\n\nFractions let you talk about parts of a whole when things are not whole numbers. Once fractions click, decimals and percents become much easier too. Let us make friends with numerators and denominators.',
      },
      {
        type: 'vocab',
        title: 'Key Vocabulary',
        terms: [
          { term: 'Fraction', definition: 'A number that names equal parts of a whole or a set, written a/b.' },
          { term: 'Numerator', definition: 'The top number — how many parts you have.' },
          { term: 'Denominator', definition: 'The bottom number — how many equal parts make the whole.' },
          { term: 'Equivalent fractions', definition: 'Different fractions that name the same amount, like 1/2 and 2/4.' },
          { term: 'Simplify', definition: 'Rewrite a fraction using the smallest whole numbers possible (lowest terms).' },
          { term: 'Common denominator', definition: 'A shared bottom number that lets you add, subtract, or compare fractions fairly.' },
        ],
      },
      {
        type: 'teach',
        title: 'Parts of a Whole',
        body: 'A fraction has two jobs:\n• Denominator (bottom) = size of each piece (how many equal pieces the whole is cut into)\n• Numerator (top) = how many of those pieces you have\n\nSo 3/4 means: the whole is split into 4 equal parts, and you have 3 of them.\n\nPicture a chocolate bar with 4 equal squares. If you eat 3, you ate 3/4.\n\nImportant: Parts must be equal. Three uneven pieces of a pizza are not a fair fraction model.',
      },
      {
        type: 'teach',
        title: 'Equivalent Fractions & Simplifying',
        body: 'Equivalent fractions are equal amounts with different names. 1/2 = 2/4 = 3/6 = 4/8.\n\nRule: Multiply or divide the numerator AND denominator by the same number.\n• 1/2 × (3/3) = 3/6\n• 4/8 ÷ (4/4) = 1/2\n\nTo simplify, divide top and bottom by their greatest common factor (GCF).\n• 4/8 → divide by 4 → 1/2\n• 6/9 → divide by 3 → 2/3\n\nWhy it works: Multiplying by 3/3 is multiplying by 1, so the value does not change — only the name does.',
      },
      {
        type: 'teach',
        title: 'Adding, Subtracting & Finding a Fraction of a Number',
        body: 'Same denominators: add or subtract numerators only; keep the denominator.\n• 1/4 + 2/4 = 3/4\n• 5/6 − 1/6 = 4/6 = 2/3 simplified\n\nDifferent denominators: find a common denominator first, rewrite both fractions, then add/subtract.\n\nFinding a fraction of a whole number (of means multiply):\n• 2/5 of 20 = (2/5) × 20 = 2 × (20 ÷ 5) = 2 × 4 = 8\n\nFriendly method: divide by the denominator, then multiply by the numerator.',
      },
      {
        type: 'strategy',
        title: 'Strategy: Add Fractions with Unlike Denominators',
        steps: [
          'Write both fractions clearly.',
          'List multiples of each denominator until you find a common multiple (LCM is nicest).',
          'Rewrite each fraction as an equivalent fraction with that common denominator.',
          'Add (or subtract) the numerators; keep the common denominator.',
          'Simplify the answer if possible.',
          'Check with a picture or by estimating (is the sum less than or greater than 1?).',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 1: Equivalent Fractions',
        body: 'Problem: Show that 2/3 = 8/12.',
        steps: [
          'Start with 2/3.',
          'Multiply top and bottom by 4: (2 × 4)/(3 × 4) = 8/12.',
          'You multiplied by 4/4 = 1, so the amount stays the same.',
          'Both mean “8 out of 12 equal parts,” which is the same as 2 out of 3 bigger equal parts.',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 2: Add Unlike Denominators',
        body: 'Problem: 1/3 + 1/6',
        steps: [
          'Denominators 3 and 6. Common denominator: 6.',
          'Rewrite 1/3: multiply by 2/2 → 2/6.',
          'Add: 2/6 + 1/6 = 3/6.',
          'Simplify: 3/6 ÷ 3/3 = 1/2.',
          'Why it works: You cannot add thirds and sixths until the pieces are the same size. Common denominators make equal-sized pieces.',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 3: Fraction of a Number',
        body: 'Problem: What is 2/5 of 20?',
        steps: [
          '“Of” means multiply: (2/5) × 20.',
          'Divide 20 into 5 equal parts: 20 ÷ 5 = 4. Each fifth is 4.',
          'Take 2 of those parts: 2 × 4 = 8.',
          'Check: 2/5 is a little less than half of 20 (half would be 10), so 8 is reasonable.',
        ],
      },
      {
        type: 'mistakes',
        title: 'Common Mistakes',
        items: [
          {
            wrong: 'Adding denominators: 1/4 + 1/4 = 2/8',
            right: '1/4 + 1/4 = 2/4 = 1/2',
            fix: 'When denominators match, only add numerators. The piece size stays the same.',
          },
          {
            wrong: 'Multiplying only the numerator to make equivalent fractions',
            right: 'Change top AND bottom by the same factor',
            fix: 'Whatever you do to the top, do to the bottom (or you change the value).',
          },
          {
            wrong: 'Thinking a larger denominator always means a larger fraction',
            right: '1/8 is smaller than 1/4 because eighths are smaller pieces',
            fix: 'For unit fractions, bigger bottom → smaller pieces.',
          },
        ],
      },
      {
        type: 'practice',
        title: 'Guided Practice',
        problems: [
          { q: 'What is 2/5 of 20?', a: '8', hint: 'Divide 20 by 5, then multiply by 2.' },
          { q: 'Simplify 4/8.', a: '1/2', hint: 'Divide top and bottom by 4.' },
          { q: '1/4 + 2/4 = ?', a: '3/4', hint: 'Same denominators — add numerators only.' },
          { q: '1/2 + 1/4 = ?', a: '3/4', hint: 'Rewrite 1/2 as 2/4 first.' },
          { q: 'Which is greater: 2/3 or 3/5?', a: '2/3', hint: 'Common denominator 15: 10/15 vs 9/15.' },
          { q: 'Write two fractions equivalent to 1/3.', a: '2/6 and 3/9 (or others)', hint: 'Multiply top and bottom by the same number.' },
        ],
      },
      {
        type: 'check',
        title: 'Check for Understanding',
        problems: [
          {
            q: 'Why is 2/4 equal to 1/2 even though the numbers look different?',
            a: 'They name the same amount',
            explanation: '2/4 means 2 out of 4 equal parts — half the whole. 1/2 means 1 out of 2 equal parts — also half. Different names, same value.',
          },
          {
            q: 'Solve 1/3 + 1/6 and explain each step.',
            a: '1/2',
            explanation: 'Common denominator 6; 1/3 = 2/6; 2/6 + 1/6 = 3/6 = 1/2.',
          },
          {
            q: 'What is 3/4 of 16? How do you know?',
            a: '12',
            explanation: '16 ÷ 4 = 4, then 3 × 4 = 12. Three of the four equal groups make 12.',
          },
        ],
      },
      {
        type: 'summary',
        title: 'Quick Review & Takeaways',
        body: '⭐ Numerator = how many; denominator = equal parts in the whole.\n⭐ Equivalent fractions: multiply/divide top and bottom by the same number.\n⭐ Same denominator → add/subtract tops only.\n⭐ Different denominators → make them match first.\n⭐ “Fraction of a number”: divide by bottom, multiply by top.\n\nFractions are just fair shares — keep the pieces equal!',
      },
    ],
  },

  decimals: {
    title: 'Decimal Detectives',
    emoji: '📐',
    minutes: 14,
    sections: [
      {
        type: 'hook',
        title: 'Why Decimals Matter',
        body: 'Money, race times, batting averages, and measuring lengths all use decimals!\n\nDecimals are a special way to write fractions with tenths, hundredths, and thousandths. If you can read place value to the left of the decimal point, you can learn the places to the right too.',
      },
      {
        type: 'vocab',
        title: 'Key Vocabulary',
        terms: [
          { term: 'Decimal point', definition: 'The dot that separates whole numbers from fractional parts (as in 3.25).' },
          { term: 'Tenth', definition: 'One of 10 equal parts of a whole; written 0.1 or 1/10.' },
          { term: 'Hundredth', definition: 'One of 100 equal parts; written 0.01 or 1/100.' },
          { term: 'Thousandth', definition: 'One of 1,000 equal parts; written 0.001 or 1/1000.' },
          { term: 'Place value (decimals)', definition: 'Each place to the right is 10 times smaller than the place to its left.' },
          { term: 'Percent', definition: 'Per hundred. 50% = 50/100 = 0.50 = 1/2.' },
        ],
      },
      {
        type: 'teach',
        title: 'Reading Decimal Places',
        body: 'To the right of the decimal point:\n• 1st place = tenths (0.1)\n• 2nd place = hundredths (0.01)\n• 3rd place = thousandths (0.001)\n\nExamples:\n• 0.3 = 3/10 (“three tenths”)\n• 0.25 = 25/100 = 1/4 (“twenty-five hundredths”)\n• 1.07 = 1 + 7/100 (“one and seven hundredths”)\n\nRead the whole number, say “and” for the decimal point, then read the fractional part with its place name.',
      },
      {
        type: 'teach',
        title: 'Decimals, Fractions & Percents',
        body: 'These three are teammates:\n• 0.5 = 5/10 = 1/2 = 50%\n• 0.25 = 25/100 = 1/4 = 25%\n• 0.2 = 2/10 = 1/5 = 20%\n\nTo write a fraction with denominator 10 or 100 as a decimal, put the numerator in the correct places.\n• 7/10 = 0.7\n• 7/100 = 0.07 (need a zero in the tenths place!)\n\nTo find a percent of a number: change the percent to a decimal, then multiply.\n• 50% of 80 = 0.50 × 80 = 40',
      },
      {
        type: 'teach',
        title: 'Adding & Subtracting Decimals',
        body: 'Golden rule: line up the decimal points!\n\nWhy? So tenths add to tenths and hundredths add to hundredths — just like ones add to ones.\n\nSteps:\n1. Write the numbers one under the other with decimal points aligned.\n2. Add zeros as placeholders so both numbers have the same number of decimal places.\n3. Add or subtract as with whole numbers.\n4. Bring the decimal point straight down into the answer.\n\nExample setup for 2.5 + 1.75:\n  2.50\n+ 1.75\n------\n  4.25',
      },
      {
        type: 'strategy',
        title: 'Strategy: Compare or Compute with Decimals',
        steps: [
          'Line up decimal points (for comparing, adding, or subtracting).',
          'Add trailing zeros so numbers have the same length (2.5 → 2.50).',
          'Compare digit by digit from the left, or compute column by column.',
          'Place the decimal point in the answer directly below the others.',
          'Estimate first (2.5 + 1.75 is about 2.5 + 2 = 4.5) to check reasonableness.',
          'For money problems, always keep two decimal places in the final answer.',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 1: Fraction to Decimal',
        body: 'Problem: Write 7/10 as a decimal.',
        steps: [
          'Denominator is 10, so this is tenths.',
          'Put 7 in the tenths place: 0.7.',
          'Why: 7/10 means 7 one-tenths, which is exactly the first decimal place.',
          'Check: 0.7 = 7/10 ✓',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 2: Add Decimals',
        body: 'Problem: 2.5 + 1.75',
        steps: [
          'Line up decimal points. Write 2.5 as 2.50.',
          'Add hundredths: 0 + 5 = 5.',
          'Add tenths: 5 + 7 = 12. Write 2, carry 1.',
          'Add ones: 2 + 1 + 1 (carry) = 4.',
          'Answer: 4.25. Estimate check: 2.5 + 1.8 ≈ 4.3 — close to 4.25 ✓',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 3: Percent of a Number',
        body: 'Problem: What is 50% of 80?',
        steps: [
          '50% means 50 per 100 = 50/100 = 0.5.',
          'Multiply: 0.5 × 80 = 40.',
          'Another way: 50% is half, and half of 80 is 40.',
          'Why both work: Percent is just a decimal (or fraction) in disguise.',
        ],
      },
      {
        type: 'mistakes',
        title: 'Common Mistakes',
        items: [
          {
            wrong: 'Lining up numbers on the right like whole numbers: 2.5 + 1.75 → treating as 25 + 175',
            right: 'Line up decimal points: 2.50 + 1.75 = 4.25',
            fix: 'Always stack on the decimal point, not on the last digit.',
          },
          {
            wrong: 'Writing 7/100 as 0.7',
            right: '7/100 = 0.07',
            fix: 'Hundredths need two places after the decimal. Fill empty tenths with 0.',
          },
          {
            wrong: 'Thinking 0.30 is larger than 0.3',
            right: '0.30 = 0.3 (same value)',
            fix: 'Trailing zeros after the decimal do not change value; they are placeholders.',
          },
        ],
      },
      {
        type: 'practice',
        title: 'Guided Practice',
        problems: [
          { q: 'Write 7/10 as a decimal.', a: '0.7', hint: 'Tenths = one digit after the decimal.' },
          { q: '3.2 + 1.5 = ?', a: '4.7', hint: 'Line up decimals; add tenths, then ones.' },
          { q: 'What is 50% of 80?', a: '40', hint: '50% = half = 0.5.' },
          { q: 'Which is greater: 0.8 or 0.75?', a: '0.8', hint: 'Write 0.80 vs 0.75.' },
          { q: '5.00 − 2.35 = ?', a: '2.65', hint: 'Line up points; subtract carefully with regrouping.' },
          { q: 'Write 0.25 as a fraction in simplest form.', a: '1/4', hint: '0.25 = 25/100; divide by 25.' },
        ],
      },
      {
        type: 'check',
        title: 'Check for Understanding',
        problems: [
          {
            q: 'Why must you line up decimal points when adding?',
            a: 'So same places combine',
            explanation: 'Tenths must add to tenths and hundredths to hundredths — just like ones add to ones. The decimal point keeps places aligned.',
          },
          {
            q: 'Write 3/100 as a decimal and explain the zero.',
            a: '0.03',
            explanation: 'Hundredths need two decimal places. 3 hundredths means 0 tenths and 3 hundredths → 0.03.',
          },
          {
            q: 'What is 25% of 40? Show two methods if you can.',
            a: '10',
            explanation: '0.25 × 40 = 10, or 25/100 × 40 = (1/4) × 40 = 10. Same answer, different forms.',
          },
        ],
      },
      {
        type: 'summary',
        title: 'Quick Review & Takeaways',
        body: '⭐ Tenths, hundredths, thousandths — each place is 10× smaller.\n⭐ Decimals ↔ fractions ↔ percents are different outfits for the same value.\n⭐ Line up decimal points to add/subtract.\n⭐ Trailing zeros (0.30) do not change the value.\n⭐ Estimate to check if your decimal answer is reasonable.\n\nYou are a decimal detective now — follow the points!',
      },
    ],
  },

  geometry: {
    title: 'Geometry Galaxy',
    emoji: '📏',
    minutes: 14,
    sections: [
      {
        type: 'hook',
        title: 'Why Geometry Matters',
        body: 'Video game maps, sports fields, building Lego sets, wrapping gifts, and designing rooms all use geometry!\n\nShapes, angles, perimeter, area, and volume help you measure and build the world around you. Today we connect the names of shapes to the formulas that describe their size.',
      },
      {
        type: 'vocab',
        title: 'Key Vocabulary',
        terms: [
          { term: 'Polygon', definition: 'A closed shape made of straight sides (triangle, square, pentagon…).' },
          { term: 'Angle', definition: 'The figure formed by two rays that share an endpoint. Measured in degrees (°).' },
          { term: 'Right angle', definition: 'An angle that measures exactly 90° — like the corner of a book.' },
          { term: 'Perimeter', definition: 'The distance around a shape (add all side lengths).' },
          { term: 'Area', definition: 'The amount of space covering a flat surface, in square units.' },
          { term: 'Volume', definition: 'The space inside a 3-D object, in cubic units.' },
        ],
      },
      {
        type: 'teach',
        title: 'Shapes & Angles',
        body: 'Count the sides to name many polygons:\n• 3 sides → triangle\n• 4 sides → quadrilateral (square, rectangle, rhombus, trapezoid…)\n• 5 sides → pentagon\n• 6 sides → hexagon\n• 8 sides → octagon\n\nAngles:\n• Right angle = 90°\n• Acute angle = less than 90°\n• Obtuse angle = more than 90° but less than 180°\n• Straight angle = 180°\n\nA rectangle has 4 right angles. A square is a special rectangle with all sides equal.',
      },
      {
        type: 'teach',
        title: 'Perimeter vs Area',
        body: 'Perimeter = fence around the yard (distance around).\nArea = grass covering the yard (space inside).\n\nRectangle:\n• Perimeter P = 2 × (length + width) or L + W + L + W\n• Area A = length × width\n\nSquare (side s):\n• Perimeter = 4 × s\n• Area = s × s = s²\n\nUnits matter:\n• Perimeter uses length units (cm, in, m)\n• Area uses square units (cm², in², m²)\n\nIf you only add the sides, you get perimeter. If you multiply length by width for a rectangle, you get area.',
      },
      {
        type: 'teach',
        title: 'Volume of Rectangular Prisms',
        body: 'Volume measures how much space fills a 3-D box (rectangular prism).\n\nFormula: Volume = length × width × height\nV = l × w × h\n\nThink of it as:\n1. Area of the base (l × w) = how many cubes cover the bottom layer\n2. Multiply by height = how many layers of cubes stack up\n\nExample: A box 2 by 3 by 4:\n• Base layer = 2 × 3 = 6 cubes\n• 4 layers → 6 × 4 = 24 cubic units\n\nUnits: cubic units (cm³, in³).',
      },
      {
        type: 'strategy',
        title: 'Strategy: Choose the Right Measurement',
        steps: [
          'Read the question: around? covering? filling inside?',
          'Around → perimeter (add all outer sides).',
          'Covering a flat surface → area (square units; multiply for rectangles).',
          'Filling a 3-D space → volume (cubic units; l × w × h for boxes).',
          'Write the formula, plug in numbers, include units if given.',
          'Estimate: a 5×5 square should have area 25, not 20 (that would be perimeter).',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 1: Rectangle Perimeter & Area',
        body: 'Problem: A rectangle is 6 units by 4 units. Find area and perimeter.',
        steps: [
          'Area = length × width = 6 × 4 = 24 square units.',
          'Perimeter = 2 × (6 + 4) = 2 × 10 = 20 units.',
          'Why different? Area counts unit squares that tile the inside. Perimeter counts the walk around the edge.',
          'Sketch check: 6 along the top and bottom, 4 on each side → 6+4+6+4 = 20 ✓',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 2: Square Area',
        body: 'Problem: What is the area of a 5×5 square?',
        steps: [
          'All sides are 5.',
          'Area = 5 × 5 = 25 square units.',
          'Perimeter would be 4 × 5 = 20 units — do not mix them up!',
          'Why 25? You can imagine 5 rows of 5 unit squares.',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 3: Box Volume',
        body: 'Problem: Volume of a 2 × 3 × 4 box?',
        steps: [
          'Identify dimensions: length 2, width 3, height 4 (order does not change the product).',
          'Multiply: 2 × 3 = 6, then 6 × 4 = 24.',
          'Answer: 24 cubic units.',
          'Why: 6 cubes per layer × 4 layers = 24 cubes filling the box.',
        ],
      },
      {
        type: 'mistakes',
        title: 'Common Mistakes',
        items: [
          {
            wrong: 'Using area formula when asked for perimeter',
            right: 'Perimeter adds sides; area multiplies for rectangles',
            fix: 'Ask: “Am I measuring around or covering?”',
          },
          {
            wrong: 'Forgetting square or cubic units',
            right: 'Area → square units; volume → cubic units',
            fix: 'Match the unit type to the measurement type.',
          },
          {
            wrong: 'Adding length + width only once for perimeter of a rectangle',
            right: 'P = 2(L + W) because there are two lengths and two widths',
            fix: 'Walk all the way around: L + W + L + W.',
          },
        ],
      },
      {
        type: 'practice',
        title: 'Guided Practice',
        problems: [
          { q: 'Area of a 5×5 square?', a: '25 square units', hint: 'Side × side.' },
          { q: 'Perimeter of a 7×3 rectangle?', a: '20 units', hint: '2 × (7 + 3).' },
          { q: 'Volume of a 2×3×4 box?', a: '24 cubic units', hint: 'Multiply all three dimensions.' },
          { q: 'How many degrees in a right angle?', a: '90°', hint: 'Corner of a square.' },
          { q: 'A triangle has sides 5, 6, and 7. Perimeter?', a: '18', hint: 'Add all three sides.' },
          { q: 'Rectangle area is 36 and length is 9. What is the width?', a: '4', hint: 'Area = L × W, so W = 36 ÷ 9.' },
        ],
      },
      {
        type: 'check',
        title: 'Check for Understanding',
        problems: [
          {
            q: 'A rectangle is 8 by 3. Which is larger, its area or perimeter number? Explain carefully.',
            a: 'Area 24 > perimeter 22',
            explanation: 'Area = 8 × 3 = 24 square units. Perimeter = 2(8+3) = 22 units. The numbers 24 and 22 use different unit types, but 24 is the larger number here.',
          },
          {
            q: 'Why does volume use cubic units?',
            a: 'It counts unit cubes that fill space',
            explanation: 'Volume measures 3-D space. Unit cubes have length, width, and height of 1, so we count cubic units.',
          },
          {
            q: 'Name a polygon with 6 sides and describe a right angle.',
            a: 'Hexagon; 90° corner',
            explanation: 'Hexagon has 6 sides. A right angle measures 90°, like the corner of a piece of paper.',
          },
        ],
      },
      {
        type: 'summary',
        title: 'Quick Review & Takeaways',
        body: '⭐ Count sides to name polygons; right angle = 90°.\n⭐ Perimeter = around (add). Area = cover (L×W for rectangles).\n⭐ Volume of a box = l × w × h (cubic units).\n⭐ Match the formula to the question word: around / cover / fill.\n⭐ Sketch shapes — pictures catch formula mix-ups fast.\n\nGeometry is everywhere — you just learned to measure it!',
      },
    ],
  },

  wordProblems: {
    title: 'Word Problem Workshop',
    emoji: '📖',
    minutes: 15,
    sections: [
      {
        type: 'hook',
        title: 'Why Word Problems Matter',
        body: 'Real life does not hand you “7 × 8 = ?” on a worksheet. It gives you stories: shopping, sharing, sports scores, and recipes.\n\nWord problems train you to turn a story into math. That skill is pure superpower — and it works the same way every time with a clear plan.',
      },
      {
        type: 'vocab',
        title: 'Key Vocabulary',
        terms: [
          { term: 'Word problem', definition: 'A math question written as a story or real-world situation.' },
          { term: 'Operation', definition: 'Add, subtract, multiply, or divide — the action you choose.' },
          { term: 'Clue words', definition: 'Words that hint at an operation (total, left, each, share…). Not perfect alone — always read the whole story!' },
          { term: 'Two-step problem', definition: 'A problem that needs more than one calculation to finish.' },
          { term: 'Reasonableness', definition: 'Checking whether your answer makes sense in the real situation.' },
          { term: 'Label', definition: 'The unit or object name in your answer (apples, dollars, kids…).' },
        ],
      },
      {
        type: 'teach',
        title: 'The Read → Plan → Solve → Check Method',
        body: 'Use this every time:\n\n1) READ carefully. Underline or rewrite the question in your own words. What are you asked to find?\n2) PLAN. List the important numbers. Cross out distractors (extra numbers you do not need). Choose the operation(s).\n3) SOLVE. Write an equation and compute carefully.\n4) CHECK. Does the answer answer the question? Does it make sense? Can you reverse the operations?\n\nSlow reading is not weak — it is smart problem-solving.',
      },
      {
        type: 'teach',
        title: 'Clue Words (and Their Traps)',
        body: 'Helpful clues (always confirm with the story):\n• Add: total, altogether, combined, in all, sum, more (sometimes)\n• Subtract: left, remain, difference, how many more, change (money)\n• Multiply: each, groups of, times, per, rows of\n• Divide: share equally, split, per group, average, how many in each\n\nTraps:\n• “How many more” is usually subtract, not add.\n• “Each” often means multiply OR divide depending on the question.\n• Extra numbers may appear to distract you — only use what the question needs.',
      },
      {
        type: 'teach',
        title: 'Two-Step Stories',
        body: 'Many word problems need two steps. Example pattern:\n• First find a total cost (multiply), then find change (subtract).\n• First find how many are left (subtract), then share them (divide).\n\nTip: Write a mini roadmap:\nStep A → find ____\nStep B → use that answer to find ____\n\nKeep the first answer labeled so you know what it represents before the second step.',
      },
      {
        type: 'strategy',
        title: 'Strategy: Attack Any Word Problem',
        steps: [
          'Read the whole problem once without writing.',
          'Reread and underline the question (what must I find?).',
          'Box key numbers and units; strike out extras.',
          'Name the operation(s) and write an equation with labels.',
          'Solve step by step; show work for multi-step problems.',
          'Check: answer the question asked, include units, and test reasonableness.',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 1: One-Step Subtraction',
        body: 'Problem: Lia has 24 apples and gives away 9. How many are left?',
        steps: [
          'Question: How many apples remain?',
          'Clue: “left” / “gives away” → subtract.',
          'Equation: 24 − 9 = 15.',
          'Check: 15 + 9 = 24 ✓. Answer: 15 apples.',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 2: Multiplication Groups',
        body: 'Problem: 4 bags with 6 oranges each — how many oranges total?',
        steps: [
          'Question: Total oranges.',
          '“Each” with equal groups → multiply: 4 × 6.',
          '4 × 6 = 24.',
          'Check: 6 + 6 + 6 + 6 = 24 ✓. Answer: 24 oranges.',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 3: Two-Step Money',
        body: 'Problem: Sam buys 3 packs of markers for $4 each and pays with $30. How much change?',
        steps: [
          'Question: Change (money left after paying).',
          'Step A: Cost = 3 × $4 = $12.',
          'Step B: Change = $30 − $12 = $18.',
          'Why two steps? You must know the total cost before you can find change.',
          'Check: $12 + $18 = $30 ✓. Answer: $18.',
        ],
      },
      {
        type: 'mistakes',
        title: 'Common Mistakes',
        items: [
          {
            wrong: 'Grabbing all numbers and adding them',
            right: 'Only use numbers needed for the question',
            fix: 'Underline the question first, then select numbers with a purpose.',
          },
          {
            wrong: 'Seeing “more” and always adding',
            right: '“How many more” usually means find the difference (subtract)',
            fix: 'Rewrite the question: “What is the difference between…?”',
          },
          {
            wrong: 'Stopping after step one in a two-step problem',
            right: 'Finish every part the question asks',
            fix: 'Re-read the last sentence before you box your answer.',
          },
        ],
      },
      {
        type: 'practice',
        title: 'Guided Practice',
        problems: [
          { q: 'Lia has 24 apples, gives away 9. How many left?', a: '15', hint: '“Left” → subtract.' },
          { q: '4 bags with 6 oranges each — total?', a: '24', hint: 'Equal groups → multiply.' },
          { q: '30 stickers shared by 5 kids — each gets?', a: '6', hint: 'Shared equally → divide.' },
          { q: 'A book has 120 pages. Maya reads 45, then 30 more. Pages left?', a: '45', hint: 'Two steps: 45 + 30 = 75 read; 120 − 75 = 45 left.' },
          { q: 'Tickets cost $7 each. 5 tickets with $50. Change?', a: '$15', hint: '5 × 7 = 35; 50 − 35 = 15.' },
          { q: 'There are 18 pencils in 3 boxes equally. How many per box?', a: '6', hint: 'Equal share → 18 ÷ 3.' },
        ],
      },
      {
        type: 'check',
        title: 'Check for Understanding',
        problems: [
          {
            q: 'Why is “how many more” usually subtraction?',
            a: 'It asks for the difference',
            explanation: 'You are comparing two amounts and finding the gap between them, not combining them.',
          },
          {
            q: 'Sam buys 3 packs at $4 each with $30. Why multiply first?',
            a: 'To find total cost before change',
            explanation: 'Change = money given − total cost. You need 3 × 4 = 12 before subtracting from 30.',
          },
          {
            q: 'A problem has numbers 12, 4, and 100. The question asks how many boxes of 4 fit into 12. What is the answer?',
            a: '3',
            explanation: '100 is a distractor. 12 ÷ 4 = 3. Always match numbers to the question.',
          },
        ],
      },
      {
        type: 'summary',
        title: 'Quick Review & Takeaways',
        body: '⭐ Read → Plan → Solve → Check every time.\n⭐ Underline the question; box useful numbers.\n⭐ Clue words help, but the full story decides the operation.\n⭐ Two-step problems need a roadmap: A then B.\n⭐ Label answers and test if they make sense.\n\nYou do not just compute — you translate stories into math!',
      },
    ],
  },

  ratios: {
    title: 'Ratios & Percents',
    emoji: '⚖️',
    minutes: 15,
    sections: [
      {
        type: 'hook',
        title: 'Why Ratios & Percents Matter',
        body: 'Recipes, team rosters, maps, sale prices, and sports stats all use ratios and percents!\n\nA ratio compares two quantities. A percent is a special ratio out of 100. When you can scale ratios and find percents, you can double a recipe, understand “25% off,” and read data like a pro.',
      },
      {
        type: 'vocab',
        title: 'Key Vocabulary',
        terms: [
          { term: 'Ratio', definition: 'A comparison of two quantities, written a:b, a to b, or a/b.' },
          { term: 'Equivalent ratios', definition: 'Ratios that name the same relationship, like 2:3 and 4:6.' },
          { term: 'Rate', definition: 'A ratio that compares different units (miles per hour, price per item).' },
          { term: 'Unit rate', definition: 'A rate with a denominator of 1 (e.g., $3 per 1 candy bar).' },
          { term: 'Percent', definition: 'Per 100. 25% = 25 out of 100 = 25/100 = 1/4.' },
          { term: 'Proportion', definition: 'An equation showing two ratios are equal, like 2/3 = 4/6.' },
        ],
      },
      {
        type: 'teach',
        title: 'What is a Ratio?',
        body: 'A ratio compares two amounts.\n• 2:3 means 2 parts to 3 parts\n• Order matters: 2:3 is not the same as 3:2\n• You can write ratios as 2:3, 2 to 3, or 2/3\n\nExample: In a fruit bowl with 2 apples and 3 bananas, the ratio of apples to bananas is 2:3.\n\nPart-to-part vs part-to-whole:\n• Apples to bananas = 2:3 (part to part)\n• Apples to all fruit = 2:5 (part to whole), since 2 + 3 = 5 total fruits',
      },
      {
        type: 'teach',
        title: 'Equivalent Ratios & Tables',
        body: 'Equivalent ratios keep the same relationship. Multiply or divide BOTH parts by the same number.\n• 2:3 = 4:6 = 6:9 = 8:12\n\nRatio tables help you scale:\nFlour : Milk\n2 : 3\n4 : 6  (×2)\n6 : 9  (×3)\n\nTo find a missing value: figure out the multiplier.\nIf 2:3 and flour becomes 4, multiply both by 2 → milk becomes 6.\n\nSimplifying ratios: divide both parts by the GCF.\n• 4:8 ÷ 4 = 1:2',
      },
      {
        type: 'teach',
        title: 'Percents as Special Ratios',
        body: 'Percent means “per 100.”\n• 25% = 25/100 = 1/4 = 0.25\n• 50% = 50/100 = 1/2 = 0.5\n• 10% = 10/100 = 1/10 = 0.1\n\nFinding a percent of a number:\n1. Convert percent → decimal (move decimal two places left) or fraction.\n2. Multiply by the number.\n• 20% of 50 = 0.20 × 50 = 10\n• 25% of 40 = (1/4) × 40 = 10\n\nBenchmark percents save time:\n• 50% = half\n• 25% = quarter\n• 10% = divide by 10\n• 1% = divide by 100',
      },
      {
        type: 'strategy',
        title: 'Strategy: Scale a Ratio or Find a Percent',
        steps: [
          'Write the ratio in order (what compares to what?).',
          'For equivalent ratios: find the factor that takes the known part to the new part.',
          'Multiply (or divide) BOTH sides by that factor.',
          'For percents: convert % to a decimal or friendly fraction.',
          'Multiply by the whole to find the part (“percent of”).',
          'Check with estimation (10% of 50 should be 5; 20% should be about 10).',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 1: Simplify a Ratio',
        body: 'Problem: Simplify the ratio 4:8.',
        steps: [
          'Find the GCF of 4 and 8: 4.',
          'Divide both parts by 4: 4÷4 = 1, 8÷4 = 2.',
          'Simplified ratio: 1:2.',
          'Why: Dividing both parts by the same number keeps the comparison equal — just smaller numbers.',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 2: Recipe Scaling',
        body: 'Problem: A recipe uses 2 cups flour to 3 cups milk (2:3). How much milk for 4 cups flour?',
        steps: [
          'Write the ratio flour:milk = 2:3.',
          'Flour goes from 2 to 4 → multiply by 2.',
          'Multiply milk by 2 as well: 3 × 2 = 6.',
          'Answer: 6 cups milk. New ratio 4:6, which simplifies to 2:3 ✓',
        ],
      },
      {
        type: 'example',
        title: 'Worked Example 3: Percent Of',
        body: 'Problem: What is 25% of 40?',
        steps: [
          '25% = 25/100 = 1/4 = 0.25.',
          'Method A: 0.25 × 40 = 10.',
          'Method B: 25% is one-fourth, and 40 ÷ 4 = 10.',
          'Why both work: Percent is a ratio out of 100, which rewrites as a decimal or fraction before multiplying.',
        ],
      },
      {
        type: 'mistakes',
        title: 'Common Mistakes',
        items: [
          {
            wrong: 'Switching the order: writing bananas to apples when asked apples to bananas',
            right: 'Keep the order stated in the problem',
            fix: 'Write labels above the numbers: apples:bananas.',
          },
          {
            wrong: 'Multiplying only one side of a ratio',
            right: 'Scale both parts by the same factor',
            fix: 'Whatever multiplies the first number must multiply the second.',
          },
          {
            wrong: 'Treating 25% of 40 as 25 × 40',
            right: '25% of 40 = 0.25 × 40 = 10',
            fix: 'Convert the percent first; “of” means multiply by the decimal/fraction form.',
          },
        ],
      },
      {
        type: 'practice',
        title: 'Guided Practice',
        problems: [
          { q: 'Simplify the ratio 4:8.', a: '1:2', hint: 'Divide both by 4.' },
          { q: 'What is 25% of 40?', a: '10', hint: '25% = 1/4; 40 ÷ 4 = 10.' },
          { q: '3:5 is equivalent to ? : 10', a: '6', hint: '5 × 2 = 10, so multiply 3 by 2.' },
          { q: 'Ratio of 2 cats to 6 dogs, simplified?', a: '1:3', hint: 'Divide both by 2.' },
          { q: 'What is 10% of 90?', a: '9', hint: '10% → divide by 10.' },
          { q: 'A mix is 1 part juice to 4 parts water. Water for 3 parts juice?', a: '12 parts', hint: 'Multiply both parts of 1:4 by 3.' },
        ],
      },
      {
        type: 'check',
        title: 'Check for Understanding',
        problems: [
          {
            q: 'Why is 2:3 equal to 4:6?',
            a: 'Both parts multiplied by 2',
            explanation: 'Multiplying both quantities by the same factor keeps the relationship the same. 4/6 simplifies back to 2/3.',
          },
          {
            q: 'Explain how to find 20% of 50 two different ways.',
            a: '10',
            explanation: '0.20 × 50 = 10, or 10% of 50 is 5 so 20% is 2 × 5 = 10. Both use percent as a part of 100.',
          },
          {
            q: 'If the ratio of red to blue paint is 2:5, how much blue paint with 6 red?',
            a: '15',
            explanation: 'Red 2 → 6 is ×3, so blue 5 × 3 = 15. Ratio becomes 6:15 = 2:5.',
          },
        ],
      },
      {
        type: 'summary',
        title: 'Quick Review & Takeaways',
        body: '⭐ Ratios compare two quantities — order matters.\n⭐ Equivalent ratios: multiply/divide BOTH parts equally.\n⭐ Percent = per 100; convert then multiply for “percent of.”\n⭐ Benchmarks: 50%, 25%, 10% make mental math fast.\n⭐ Label your comparisons so you never flip the order.\n\nScale it, percent it, check it — you have ratio power!',
      },
    ],
  },
}

/** Section types included when multiple weak domains share lesson time */
const COMPACT_TYPES = new Set([
  'hook',
  'vocab',
  'teach',
  'strategy',
  'example',
  'mistakes',
  'practice',
  'summary',
])

/**
 * Select sections based on how many domains are in the plan.
 * 1 domain → full mini-unit; 2–3 domains → compact but still rich path.
 */
export function selectSections(lesson, domainCount) {
  if (!lesson?.sections?.length) return []

  if (domainCount <= 1) {
    return lesson.sections.map((s, i) => ({ ...s, _index: i }))
  }

  // Compact path: keep core teaching flow, limit examples, drop check
  const selected = []
  let exampleCount = 0
  const maxExamples = domainCount === 2 ? 2 : 1

  for (let i = 0; i < lesson.sections.length; i++) {
    const sec = lesson.sections[i]
    if (!COMPACT_TYPES.has(sec.type)) continue
    if (sec.type === 'example') {
      if (exampleCount >= maxExamples) continue
      exampleCount += 1
    }
    // Keep at most 2 teach sections when 3 domains
    if (sec.type === 'teach' && domainCount >= 3) {
      const teachSoFar = selected.filter((s) => s.type === 'teach').length
      if (teachSoFar >= 2) continue
    }
    selected.push({ ...sec, _index: i })
  }

  return selected
}

/**
 * Analyze quiz results and build a personalized lesson plan (~12–18 min).
 */
export function buildLessonPlan(answers, studentName, grade) {
  const byDomain = {}
  for (const key of Object.keys(DOMAINS)) {
    byDomain[key] = { correct: 0, total: 0, misses: [] }
  }

  for (const a of answers) {
    const d = a.domain
    if (!byDomain[d]) byDomain[d] = { correct: 0, total: 0, misses: [] }
    byDomain[d].total += 1
    if (a.correct) byDomain[d].correct += 1
    else byDomain[d].misses.push(a)
  }

  const scores = Object.entries(byDomain)
    .filter(([, v]) => v.total > 0)
    .map(([domain, v]) => ({
      domain,
      ...v,
      rate: v.correct / v.total,
      meta: DOMAINS[domain],
    }))
    .sort((a, b) => a.rate - b.rate || b.total - a.total)

  // Focus on weakest domains under 80%, max 3; prefer lowest accuracy
  let focus = scores.filter((s) => s.rate < 0.8).slice(0, 3)
  if (focus.length === 0) {
    // Strong overall — reinforce the two lowest areas (or one if only one scored)
    focus = scores.slice(0, Math.min(2, scores.length))
    if (focus.length === 0) {
      focus = [
        {
          domain: 'operations',
          rate: 1,
          correct: 0,
          total: 0,
          misses: [],
          meta: DOMAINS.operations,
        },
      ]
    }
  }

  const totalCorrect = answers.filter((a) => a.correct).length
  const total = answers.length
  const percent = total ? Math.round((totalCorrect / total) * 100) : 0

  const correctLevels = answers.filter((a) => a.correct).map((a) => a.level)
  const avgLevel =
    correctLevels.length > 0
      ? correctLevels.reduce((s, n) => s + n, 0) / correctLevels.length
      : 1

  let placement = 'Grade 3'
  if (avgLevel >= 8.5) placement = 'Grade 6+'
  else if (avgLevel >= 7) placement = 'Grade 6'
  else if (avgLevel >= 5.5) placement = 'Grade 5'
  else if (avgLevel >= 4) placement = 'Grade 4'
  else if (avgLevel >= 2.5) placement = 'Grade 3'
  else placement = 'Building Grade 3 skills'

  const domainCount = focus.length

  const lessonBlocks = focus.map((f) => {
    const fullLesson = LESSONS[f.domain]
    const sections = selectSections(fullLesson, domainCount)
    // Per-domain minutes: deeper when fewer focus areas
    let minutes
    if (domainCount === 1) minutes = fullLesson.minutes || 15
    else if (domainCount === 2) minutes = 7
    else minutes = 5

    return {
      domain: f.domain,
      rate: f.rate,
      meta: f.meta,
      lesson: {
        ...fullLesson,
        minutes,
        sections,
      },
      misses: f.misses.slice(0, domainCount === 1 ? 2 : 1),
    }
  })

  const contentMinutes = lessonBlocks.reduce((s, b) => s + (b.lesson?.minutes || 5), 0)
  // Intro + wrap overhead ~2 min; clamp to a realistic 12–18 session
  const estimatedMinutes = Math.min(18, Math.max(12, contentMinutes + 2))

  return {
    studentName,
    grade,
    totalCorrect,
    total,
    percent,
    placement,
    avgLevel: Math.round(avgLevel * 10) / 10,
    scores,
    lessonBlocks,
    estimatedMinutes,
    deepDive: domainCount === 1,
    message: feedbackMessage(percent, studentName),
  }
}

function feedbackMessage(percent, name) {
  if (percent >= 90)
    return `Incredible work, ${name}! You're crushing it — let's polish a few challenge skills.`
  if (percent >= 75)
    return `Great job, ${name}! You've got a strong foundation. Here's a focused boost.`
  if (percent >= 50)
    return `Nice effort, ${name}! You're building solid skills. This lesson targets your next wins.`
  return `You showed up and tried hard, ${name}! This mini-lesson will help you level up fast.`
}
