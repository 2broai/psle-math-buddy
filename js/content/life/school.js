// World: school — see README.md in this folder for the format.
// Getting ready for Primary 1: canteen, classroom, recess, my things, getting to and from school.
export const TOPICS = [
  // ------------------------------------------------------------------ the canteen
  {
    id: 'life.p1-canteen',
    world: 'school',
    icon: '🍜',
    title: 'The school canteen',
    vi: 'Ở căn-tin trường',
    goal: 'Con tự tin tự mua đồ ăn ở căn-tin: xếp hàng, gọi món lễ phép, trả tiền và kiểm tra tiền thối, ăn xong trong giờ ra chơi.',
    talk: [
      'Nếu mẹ cho con $2, con sẽ mua món gì ở căn-tin? Còn thừa bao nhiêu tiền?',
      'Mình đóng vai nhé: bố mẹ làm cô bán hàng, con gọi món và trả tiền.',
      'Giờ ra chơi ngắn lắm. Con nên ăn trước hay chơi trước? Vì sao?'
    ],
    scenarios: [
      {
        id: 'p1-canteen-queue',
        tier: 1,
        region: 'SG',
        value: 'respect',
        scene: '🍜🧍🧒',
        pic: {
          bg: 'canteen',
          cast: [
            { e: '👩‍🍳', size: 'l', x: 12 },
            { e: '👧', flip: true, x: 33 },
            { e: '👦', flip: true, x: 50 },
            { e: '🧒', you: true, flip: true, x: 80, think: '🍜' }
          ]
        },
        q: {
          en: "At recess, there's a long queue at the noodle stall. You are very hungry! What do you do?",
          vi: 'Giờ ra chơi, quầy mì có một hàng dài. Con đói lắm rồi! Con làm gì?'
        },
        choices: [
          {
            e: '🧍',
            en: 'Join the end of the queue and wait for your turn',
            vi: 'Đứng vào cuối hàng và chờ đến lượt',
            v: 'best',
            why: {
              en: 'Everyone is hungry, so everyone waits their turn. The queue moves faster than you think.',
              vi: 'Ai cũng đói, nên ai cũng chờ đến lượt. Hàng đi nhanh hơn con nghĩ đấy.'
            }
          },
          {
            e: '👋',
            en: 'Go and stand with {friend}, who is near the front',
            vi: 'Chen vào đứng cùng {friend} ở gần đầu hàng',
            v: 'no',
            why: {
              en: 'Standing with a friend is fun, but joining in the middle is still cutting the queue. The children behind would feel it’s unfair.',
              vi: 'Đứng cùng bạn thì vui, nhưng chen vào giữa hàng vẫn là chen ngang. Các bạn phía sau sẽ thấy không công bằng.'
            }
          },
          {
            e: '🏃',
            en: 'Squeeze in at the front when no one is looking',
            vi: 'Lén chen lên đầu hàng khi không ai để ý',
            v: 'no',
            why: {
              en: 'The others have been waiting too. Cutting in is unfair, even if no one sees.',
              vi: 'Các bạn khác cũng đang chờ. Chen ngang là không công bằng, dù không ai nhìn thấy.'
            }
          }
        ],
        lesson: {
          en: 'In the canteen, join the end of the queue and wait your turn — it’s fair for everyone.',
          vi: 'Ở căn-tin, con đứng vào cuối hàng và chờ đến lượt — như vậy là công bằng với mọi người.'
        }
      },
      {
        id: 'p1-canteen-order',
        tier: 1,
        region: 'SG',
        value: 'respect',
        scene: '🧑‍🍳🍗🧒',
        pic: {
          bg: 'canteen',
          cast: [
            { e: '🧒', you: true, x: 32 },
            { e: '👩‍🍳', size: 'l', flip: true, x: 70, say: { en: 'What would you like?', vi: 'Con muốn ăn gì nào?' } }
          ],
          props: ['🍗', '🍚']
        },
        q: {
          en: "It's your turn at the chicken rice stall. The auntie looks at you. What do you say?",
          vi: 'Đến lượt con ở quầy cơm gà. Cô bán hàng nhìn con. Con nói gì?'
        },
        choices: [
          {
            e: '🙏',
            en: "'Auntie, one chicken rice, please.' Then, 'Thank you!'",
            vi: '‘Cô ơi, cho con một phần cơm gà ạ.’ Rồi ‘Con cảm ơn cô!’',
            v: 'best',
            why: {
              en: 'Clear words with ‘please’ and ‘thank you’ make ordering easy — and make the auntie smile.',
              vi: 'Nói rõ ràng, lễ phép và cảm ơn giúp gọi món dễ dàng — và làm cô bán hàng mỉm cười.'
            }
          },
          {
            e: '👉',
            en: 'Point at the food and say nothing',
            vi: 'Chỉ tay vào món ăn mà không nói gì',
            v: 'ok',
            why: {
              en: 'Pointing helps when it’s noisy! Adding a few words, with ‘please’ and ‘thank you’, is clearer and more polite.',
              vi: 'Chỉ tay cũng giúp được khi ồn ào! Nhưng nói thêm vài lời, có ‘ạ’ và ‘cảm ơn’, thì rõ ràng và lễ phép hơn.'
            }
          },
          {
            e: '📢',
            en: "'Give me chicken rice!'",
            vi: '‘Cho cơm gà đi!’',
            v: 'no',
            why: {
              en: 'The auntie will understand, but it sounds bossy. ‘Please’ and ‘thank you’ are magic words!',
              vi: 'Cô sẽ hiểu, nhưng nghe như ra lệnh vậy. ‘Ạ’ và ‘cảm ơn’ là những từ kỳ diệu đấy!'
            }
          }
        ],
        lesson: {
          en: "At the stall, say clearly what you want, with 'please' and 'thank you'.",
          vi: 'Ở quầy, con nói rõ món mình muốn, nhớ nói ‘ạ’ và cảm ơn cô.'
        }
      },
      {
        id: 'p1-canteen-carry',
        tier: 1,
        scene: '🍲🚶⚠️',
        pic: {
          bg: 'canteen',
          cast: [
            { e: '🧒', you: true, x: 28 },
            { e: '👦', x: 58 },
            { e: '👧', flip: true, x: 82 }
          ],
          props: ['🍲']
        },
        q: {
          en: 'You are carrying a hot bowl of soup noodles to your table. The canteen is busy. How do you walk?',
          vi: 'Con đang bưng một bát mì nước nóng về bàn. Căn-tin rất đông. Con đi thế nào?'
        },
        choices: [
          {
            e: '🐢',
            en: 'Slowly, with both hands, watching where you go',
            vi: 'Đi chậm, bưng bằng hai tay và nhìn đường đi',
            v: 'best',
            why: {
              en: 'Hot soup can burn if it spills. Slow steps and two hands keep you and others safe.',
              vi: 'Canh nóng đổ ra có thể gây bỏng. Đi chậm và bưng hai tay giúp con và các bạn an toàn.'
            }
          },
          {
            e: '🏃',
            en: 'Quickly, so you can get a seat first',
            vi: 'Đi thật nhanh để giành chỗ ngồi',
            v: 'no',
            why: {
              en: 'Rushing in a crowd can make the soup splash and burn someone. There are enough seats — take your time.',
              vi: 'Vội vàng giữa chỗ đông người có thể làm canh văng ra, gây bỏng. Chỗ ngồi đủ cho mọi người — con cứ từ từ.'
            }
          },
          {
            e: '👋',
            en: 'With one hand, so you can wave to {friend}',
            vi: 'Cầm một tay để tay kia vẫy {friend}',
            v: 'no',
            why: {
              en: 'One hand isn’t enough for a hot bowl — it could tip over. Put it down first, then wave!',
              vi: 'Một tay không đủ giữ bát nóng đâu — bát có thể bị đổ. Đặt bát xuống trước rồi hãy vẫy bạn nhé!'
            }
          }
        ],
        lesson: {
          en: 'Carrying hot food? Two hands, slow steps, eyes ahead.',
          vi: 'Bưng đồ ăn nóng? Hai tay, bước chậm, mắt nhìn phía trước.'
        }
      },
      {
        id: 'p1-canteen-eatfirst',
        tier: 2,
        value: 'responsibility',
        scene: '⏰🍱⚽',
        pic: {
          bg: 'canteen',
          cast: [
            { e: '🧒', you: true, x: 35, think: '🍱⚽' },
            { e: '🧒', flip: true, x: 72, say: { en: "Let's play catching!", vi: 'Chơi đuổi bắt đi!' } }
          ]
        },
        q: {
          en: 'Recess has just started. You want to play catching with your friends, and you also need to eat. What is the best plan?',
          vi: 'Giờ ra chơi vừa bắt đầu. Con muốn chơi đuổi bắt với các bạn, mà con cũng cần ăn. Kế hoạch nào tốt nhất?'
        },
        choices: [
          {
            e: '🍱',
            en: 'Get your food and eat first, then play',
            vi: 'Lấy đồ ăn và ăn trước, rồi mới chơi',
            v: 'best',
            why: {
              en: 'Recess goes fast. Eating first means you won’t be hungry in class, and you can play without worrying.',
              vi: 'Giờ ra chơi trôi qua nhanh lắm. Ăn trước thì con không bị đói trong lớp, và chơi thoải mái hơn.'
            }
          },
          {
            e: '⚽',
            en: 'Play first, then eat when the game is over',
            vi: 'Chơi trước, chơi xong rồi ăn',
            v: 'no',
            why: {
              en: 'Games can go on and on! The bell might ring before you eat, and then you’ll sit in class with an empty tummy.',
              vi: 'Trò chơi cứ kéo dài mãi! Chuông có thể reo trước khi con kịp ăn, rồi con phải ngồi học với cái bụng đói.'
            }
          },
          {
            e: '🙅',
            en: 'Skip food today — playing is more fun',
            vi: 'Hôm nay nhịn ăn — chơi vui hơn',
            v: 'no',
            why: {
              en: 'Your body and brain need food to learn and play. An empty tummy makes it hard to listen in class.',
              vi: 'Cơ thể và đầu óc con cần thức ăn để học và chơi. Bụng đói thì khó tập trung nghe giảng lắm.'
            }
          }
        ],
        lesson: {
          en: 'At recess: eat first, then play. Your tummy will thank you!',
          vi: 'Giờ ra chơi: ăn trước, chơi sau. Cái bụng của con sẽ cảm ơn con đấy!'
        }
      },
      {
        id: 'p1-canteen-budget',
        tier: 2,
        region: 'SG',
        value: 'responsibility',
        scene: '💵🍗🥤',
        pic: {
          bg: 'canteen',
          cast: [
            { e: '🧒', you: true, x: 35, think: '🍗🥤' },
            { e: '👩‍🍳', size: 'l', flip: true, x: 72 }
          ],
          props: ['💵']
        },
        q: {
          en: 'You have $2 for recess. Chicken rice costs $2, and a drink costs 80 cents. You want both. What can you do?',
          vi: 'Con có $2 để tiêu giờ ra chơi. Cơm gà giá $2, nước uống giá 80 xu. Con muốn mua cả hai. Con làm thế nào?'
        },
        choices: [
          {
            e: '💧',
            en: 'Buy the chicken rice, and drink water from your bottle',
            vi: 'Mua cơm gà, và uống nước trong bình của con',
            v: 'best',
            why: {
              en: '$2 is just enough for the chicken rice. Water from your bottle is free — and healthy too!',
              vi: '$2 vừa đủ mua cơm gà. Nước trong bình thì không mất tiền — mà còn tốt cho sức khoẻ!'
            }
          },
          {
            e: '🙏',
            en: 'Ask the auntie to give you a drink for free',
            vi: 'Xin cô bán hàng cho con nước uống miễn phí',
            v: 'no',
            why: {
              en: 'Selling food and drinks is the auntie’s job, so she needs to be paid. You have water in your bottle!',
              vi: 'Bán đồ ăn thức uống là công việc của cô, nên cô cần được trả tiền. Con có nước trong bình mà!'
            }
          },
          {
            e: '📝',
            en: 'Buy both, and say you will pay tomorrow',
            vi: 'Mua cả hai rồi hứa mai trả tiền',
            v: 'no',
            why: {
              en: 'It’s best to buy only what you can pay for today. Then you don’t owe anyone money.',
              vi: 'Tốt nhất là chỉ mua những gì con trả được ngay hôm nay. Như vậy con không nợ ai cả.'
            }
          }
        ],
        lesson: {
          en: 'Before you buy, check: do I have enough money? If not, choose one thing.',
          vi: 'Trước khi mua, con kiểm tra: mình có đủ tiền không? Nếu không đủ, chọn một món thôi.'
        }
      },
      {
        id: 'p1-canteen-lostmoney',
        tier: 2,
        value: 'responsibility',
        scene: '👖🪙❓',
        pic: {
          bg: 'canteen',
          cast: [
            { e: '🧒', you: true, x: 40, think: '🪙❓' },
            { e: '🧑‍🏫', size: 'l', flip: true, x: 80 }
          ]
        },
        q: {
          en: 'At recess, you put your hand in your pocket. Your money is gone! What should you do?',
          vi: 'Giờ ra chơi, con thò tay vào túi. Tiền của con mất rồi! Con nên làm gì?'
        },
        choices: [
          {
            e: '🧑‍🏫',
            en: 'Tell a teacher on duty, or your form teacher',
            vi: 'Nói với thầy cô trực, hoặc cô chủ nhiệm',
            v: 'best',
            why: {
              en: 'Teachers help with problems like this every day. They can help you look, or make sure you get some food.',
              vi: 'Thầy cô ngày nào cũng giúp các bạn những chuyện như thế. Thầy cô sẽ giúp con tìm, hoặc lo cho con có cái ăn.'
            }
          },
          {
            e: '🪙',
            en: 'Take some coins you see on an empty table',
            vi: 'Lấy mấy đồng xu con thấy trên một cái bàn trống',
            v: 'no',
            why: {
              en: 'Those coins belong to someone else, who might be looking for them. A teacher can help you instead.',
              vi: 'Những đồng xu đó là của người khác, có thể ai đó đang đi tìm. Hãy nhờ thầy cô giúp con.'
            }
          },
          {
            e: '😔',
            en: "Stay hungry and don't tell anyone",
            vi: 'Chịu đói và không nói với ai',
            v: 'no',
            why: {
              en: 'Being hungry makes it hard to learn. Telling a teacher isn’t a bother — helping you is part of their job.',
              vi: 'Bụng đói thì khó học lắm. Nói với thầy cô không làm phiền ai đâu — giúp con là việc của thầy cô mà.'
            }
          }
        ],
        lesson: {
          en: 'Lost your money? Tell a teacher. Tip: keep money in a zipped pocket or a small purse.',
          vi: 'Mất tiền? Hãy báo thầy cô. Mẹo nhỏ: để tiền trong túi có khoá kéo hoặc ví nhỏ.'
        }
      },
      {
        id: 'p1-canteen-change',
        tier: 3,
        region: 'SG',
        value: 'respect',
        scene: '🥤🪙🤔',
        pic: {
          bg: 'canteen',
          cast: [
            { e: '🧒', you: true, x: 32, think: '🪙❓' },
            { e: '👩‍🍳', size: 'l', flip: true, x: 70, say: { en: "Here's your change — 20 cents.", vi: 'Cô thối con 20 xu nhé.' } }
          ],
          props: ['🥤']
        },
        q: {
          en: 'Your drink costs 60 cents. You pay with a $1 coin. The auntie gives you back 20 cents. What should you do?',
          vi: 'Nước của con giá 60 xu. Con trả bằng đồng $1. Cô bán hàng thối lại cho con 20 xu. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙂',
            en: "Politely say, 'Auntie, I think I should get 40 cents back.'",
            vi: 'Lễ phép nói: ‘Cô ơi, hình như con phải được thối 40 xu ạ.’',
            v: 'best',
            why: {
              en: '$1 take away 60 cents is 40 cents. Anyone can make a mistake when it’s busy — a polite reminder fixes it.',
              vi: '$1 trừ 60 xu còn 40 xu. Lúc đông khách ai cũng có thể nhầm — nhắc lễ phép là ổn ngay.'
            }
          },
          {
            e: '🤷',
            en: 'Say nothing — maybe you counted wrong',
            vi: 'Không nói gì — có khi con đếm nhầm',
            v: 'ok',
            why: {
              en: 'Checking is smart, so count again: $1 take away 60 cents is 40 cents. If it’s still wrong, politely tell the auntie.',
              vi: 'Kiểm tra lại là khôn, con đếm lại nhé: $1 trừ 60 xu còn 40 xu. Nếu vẫn thiếu, con lễ phép nói với cô.'
            }
          },
          {
            e: '😠',
            en: "Shout, 'You cheated me!'",
            vi: 'Hét lên: ‘Cô lừa con!’',
            v: 'no',
            why: {
              en: 'It was probably an accident — the canteen is busy. Polite words fix mistakes better than angry ones.',
              vi: 'Có lẽ cô chỉ nhầm thôi vì căn-tin rất đông. Nói lễ phép thì dễ sửa sai hơn là nói giận dữ.'
            }
          }
        ],
        lesson: {
          en: 'Always count your change. If it’s wrong, tell the auntie politely — everyone makes mistakes.',
          vi: 'Luôn đếm lại tiền thối. Nếu sai, con lễ phép báo cô — ai cũng có thể nhầm mà.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ the classroom
  {
    id: 'life.p1-class',
    world: 'school',
    icon: '✋',
    title: 'In the classroom',
    vi: 'Trong lớp học',
    goal: 'Con biết nề nếp trong lớp: chào thầy cô, giơ tay khi muốn nói, xin phép đi vệ sinh, hỏi khi chưa hiểu, lắng nghe khi người khác nói.',
    talk: [
      'Nếu cô giảng mà con chưa hiểu, con sẽ nói gì với cô? Thử nói bằng tiếng Anh nhé.',
      'Con muốn đi vệ sinh trong giờ học thì xin phép thế nào?',
      'Vì sao trong lớp mình cần giơ tay trước khi nói?'
    ],
    scenarios: [
      {
        id: 'p1-class-greet',
        tier: 1,
        value: 'respect',
        scene: '🧑‍🏫🚪🧒',
        pic: {
          bg: 'classroom',
          cast: [
            { e: '🧒', you: true, x: 20 },
            { e: '👦', x: 45, say: { en: 'Class, stand up!', vi: 'Cả lớp đứng!' } },
            { e: '🧑‍🏫', size: 'l', flip: true, x: 80 }
          ],
          props: ['🖍️']
        },
        q: {
          en: "Your teacher walks into the classroom. The class monitor says, 'Class, stand up!' What do you do?",
          vi: 'Cô giáo bước vào lớp. Bạn lớp trưởng hô: ‘Cả lớp đứng!’ Con làm gì?'
        },
        choices: [
          {
            e: '🧍',
            en: "Stand up with everyone and say, 'Good morning, Teacher!'",
            vi: 'Đứng dậy cùng cả lớp và chào: ‘Chúng em chào cô ạ!’',
            v: 'best',
            why: {
              en: 'Greeting your teacher together shows respect, and it helps everyone get ready to learn.',
              vi: 'Cả lớp cùng chào cô là thể hiện sự lễ phép, và giúp mọi người sẵn sàng vào học.'
            }
          },
          {
            e: '🖍️',
            en: "Keep drawing — you're nearly finished",
            vi: 'Vẫn ngồi vẽ tiếp — sắp xong rồi mà',
            v: 'no',
            why: {
              en: 'Your drawing can wait a minute. Standing up and greeting together shows respect to your teacher.',
              vi: 'Bức vẽ chờ con một chút cũng được. Đứng dậy chào cùng cả lớp là thể hiện sự lễ phép với cô.'
            }
          },
          {
            e: '👋',
            en: "Wave and shout 'Hi!' from your seat",
            vi: 'Ngồi tại chỗ, vẫy tay và nói to ‘Chào cô!’',
            v: 'ok',
            why: {
              en: 'Saying hello is friendly! In class, though, we stand up and greet together — that’s how the lesson begins.',
              vi: 'Chào cô là tốt! Nhưng trong lớp, cả lớp cùng đứng dậy chào — đó là cách bắt đầu tiết học.'
            }
          }
        ],
        lesson: {
          en: 'When your teacher comes in, stand up and greet them together with your class.',
          vi: 'Khi thầy cô vào lớp, con đứng dậy và chào cùng cả lớp nhé.'
        }
      },
      {
        id: 'p1-class-hand',
        tier: 1,
        value: 'respect',
        scene: '❓✋💡',
        pic: {
          bg: 'classroom',
          cast: [
            { e: '🧒', you: true, x: 22, think: '💡' },
            { e: '👧', x: 48 },
            { e: '🧑‍🏫', size: 'l', flip: true, x: 80, say: { en: 'What is 5 + 3?', vi: '5 cộng 3 bằng mấy?' } }
          ]
        },
        q: {
          en: 'Your teacher asks the class a question. You know the answer! What do you do?',
          vi: 'Cô hỏi cả lớp một câu. Con biết câu trả lời! Con làm gì?'
        },
        choices: [
          {
            e: '✋',
            en: 'Put up your hand and wait for your teacher to call your name',
            vi: 'Giơ tay và chờ cô gọi tên con',
            v: 'best',
            why: {
              en: 'Hands up means everyone gets a fair turn, and your teacher can hear each answer clearly.',
              vi: 'Giơ tay giúp ai cũng có lượt công bằng, và cô nghe rõ từng câu trả lời.'
            }
          },
          {
            e: '📣',
            en: 'Shout out the answer straight away',
            vi: 'Nói to đáp án ngay lập tức',
            v: 'no',
            why: {
              en: 'It’s exciting to know the answer! But shouting it out means others don’t get a chance to think.',
              vi: 'Biết đáp án thì vui lắm! Nhưng nói to ngay thì các bạn khác không kịp suy nghĩ.'
            }
          },
          {
            e: '🙌',
            en: "Wave your hand and call, 'Me! Me! Me!'",
            vi: 'Vẫy tay rối rít và gọi: ‘Em ạ! Em ạ!’',
            v: 'ok',
            why: {
              en: 'Your hand is up — that part is right! Now wait quietly, so your teacher can choose fairly.',
              vi: 'Giơ tay là đúng rồi! Giờ con chờ yên lặng để cô chọn bạn trả lời cho công bằng nhé.'
            }
          }
        ],
        lesson: {
          en: 'Hand up, mouth closed, wait to be called. That way everyone gets a turn.',
          vi: 'Giơ tay, giữ im lặng, chờ được gọi. Như vậy ai cũng có lượt.'
        }
      },
      {
        id: 'p1-class-toilet',
        tier: 1,
        scene: '🚻✋🧒',
        pic: {
          bg: 'classroom',
          cast: [
            { e: '🧒', you: true, x: 30, think: '🚻' },
            { e: '🧑‍🏫', size: 'l', flip: true, x: 75 }
          ]
        },
        q: {
          en: 'In the middle of a lesson, you really need to go to the toilet. What do you do?',
          vi: 'Đang giữa giờ học, con buồn đi vệ sinh lắm. Con làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: "Put up your hand and ask, 'Teacher, may I go to the toilet, please?'",
            vi: 'Giơ tay và hỏi: ‘Thưa cô, cho em đi vệ sinh ạ.’',
            v: 'best',
            why: {
              en: 'Your teacher will let you go. Asking first means your teacher knows where you are.',
              vi: 'Thầy cô sẽ cho con đi mà. Xin phép trước để thầy cô biết con đang ở đâu.'
            }
          },
          {
            e: '😣',
            en: 'Hold it in until recess',
            vi: 'Cố nhịn đến giờ ra chơi',
            v: 'no',
            why: {
              en: 'Holding it in for a long time feels uncomfortable and can lead to an accident. It’s OK to ask — everyone needs the toilet!',
              vi: 'Nhịn lâu sẽ rất khó chịu và có thể bị ướt quần. Cứ xin phép thôi — ai cũng cần đi vệ sinh mà!'
            }
          },
          {
            e: '🚶',
            en: 'Quietly walk out without asking',
            vi: 'Lặng lẽ đi ra ngoài mà không xin phép',
            v: 'no',
            why: {
              en: 'Your teacher needs to know where every child is, to keep everyone safe. Just ask first — it only takes a moment.',
              vi: 'Thầy cô cần biết từng bạn đang ở đâu để giữ an toàn cho cả lớp. Chỉ cần xin phép trước — mất có một chút thôi.'
            }
          }
        ],
        lesson: {
          en: "Need the toilet? Put up your hand and ask. It's always OK to ask.",
          vi: 'Buồn đi vệ sinh? Giơ tay xin phép thầy cô. Xin phép lúc nào cũng được.'
        }
      },
      {
        id: 'p1-class-listen',
        tier: 2,
        value: 'respect',
        scene: '🐶🗣️👂',
        pic: {
          bg: 'classroom',
          cast: [
            { e: '🧒', you: true, x: 18, think: '🐶' },
            { e: '🧒', x: 50, say: { en: 'This is my dog, Coco!', vi: 'Đây là chó Coco nhà tớ!' } },
            { e: '🧑‍🏫', size: 'l', flip: true, x: 82 }
          ]
        },
        q: {
          en: '{friend} is telling the class about a pet dog. You have a dog too, and you really want to say so! What do you do?',
          vi: '{friend} đang kể cho cả lớp nghe về chú chó cưng. Nhà con cũng nuôi chó, và con rất muốn kể! Con làm gì?'
        },
        choices: [
          {
            e: '👂',
            en: 'Listen quietly, then put up your hand when {friend} has finished',
            vi: 'Lắng nghe, đợi {friend} kể xong rồi giơ tay',
            v: 'best',
            why: {
              en: 'Listening shows {friend} you care. When it’s your turn, others will listen to you too.',
              vi: 'Lắng nghe cho {friend} thấy con tôn trọng bạn. Đến lượt con, các bạn cũng sẽ lắng nghe con.'
            }
          },
          {
            e: '🗯️',
            en: "Call out, 'I have a dog too!'",
            vi: 'Nói chen vào: ‘Nhà tớ cũng có chó!’',
            v: 'no',
            why: {
              en: 'It’s exciting to share! But calling out interrupts {friend}’s turn. Hold the thought — your chance will come.',
              vi: 'Muốn kể thì vui lắm! Nhưng nói chen vào làm gián đoạn lượt của {friend}. Con giữ ý đó lại — lát nữa sẽ đến lượt con.'
            }
          },
          {
            e: '💬',
            en: 'Whisper about your dog to the child next to you',
            vi: 'Thì thầm kể về chú chó của con cho bạn ngồi cạnh',
            v: 'no',
            why: {
              en: 'Whispering means two people miss what {friend} is saying. Save your story for your turn.',
              vi: 'Thì thầm thì cả con và bạn bên cạnh đều không nghe {friend} kể. Hãy để dành câu chuyện cho lượt của con.'
            }
          }
        ],
        lesson: {
          en: 'When someone is talking, listen with your eyes and ears. Your turn will come!',
          vi: 'Khi người khác đang nói, con nhìn và lắng nghe. Rồi sẽ đến lượt con!'
        }
      },
      {
        id: 'p1-class-ask',
        tier: 2,
        scene: '📄❓🧒',
        pic: {
          bg: 'classroom',
          cast: [
            { e: '🧒', you: true, x: 25, think: '❓' },
            { e: '🧑‍🏫', size: 'l', flip: true, x: 75, say: { en: 'Now do your worksheet.', vi: 'Giờ các con làm phiếu nhé.' } }
          ],
          props: ['📄']
        },
        q: {
          en: "Your teacher explains the worksheet, but you don't understand what to do. What is the best thing to do?",
          vi: 'Cô giải thích phiếu bài tập, nhưng con chưa hiểu phải làm gì. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: "Put up your hand and ask, 'Teacher, can you explain again, please?'",
            vi: 'Giơ tay hỏi: ‘Thưa cô, cô giảng lại giúp em được không ạ?’',
            v: 'best',
            why: {
              en: 'Asking is smart, not silly. Often other children are wondering the same thing — you’re helping them too.',
              vi: 'Hỏi là thông minh chứ không hề ngốc. Thường các bạn khác cũng đang thắc mắc giống con — con đang giúp cả các bạn.'
            }
          },
          {
            e: '👀',
            en: "Copy whatever {friend} is writing",
            vi: 'Nhìn bài {friend} rồi chép theo',
            v: 'no',
            why: {
              en: '{friend} might be unsure too, and copying won’t help you learn. Your teacher is the best person to ask.',
              vi: '{friend} có thể cũng chưa chắc, và chép bài không giúp con hiểu. Hỏi thầy cô là tốt nhất.'
            }
          },
          {
            e: '🎲',
            en: "Just guess and hope it's right",
            vi: 'Làm đại và mong là đúng',
            v: 'ok',
            why: {
              en: 'Having a go is brave! But when you don’t understand the task, asking first saves you from doing it all again.',
              vi: 'Dám thử là dũng cảm! Nhưng khi chưa hiểu đề, hỏi trước sẽ giúp con khỏi phải làm lại từ đầu.'
            }
          },
          {
            e: '😶',
            en: 'Sit quietly and do nothing until the end',
            vi: 'Ngồi im, không làm gì cho đến hết giờ',
            v: 'no',
            why: {
              en: 'Your teacher wants to help, but can’t know you’re stuck unless you say so. It’s always OK to ask.',
              vi: 'Thầy cô muốn giúp, nhưng không biết con đang bí nếu con không nói. Hỏi lúc nào cũng được mà.'
            }
          }
        ],
        lesson: {
          en: "Don't understand? Ask! Teachers love questions — that's how we learn.",
          vi: 'Chưa hiểu? Cứ hỏi! Thầy cô rất thích học trò đặt câu hỏi — đó là cách mình học.'
        }
      },
      {
        id: 'p1-class-early',
        tier: 3,
        value: 'responsibility',
        scene: '✅📚🤫',
        pic: {
          bg: 'classroom',
          cast: [
            { e: '🧒', you: true, x: 20, think: '✅' },
            { e: '🧒', x: 50 },
            { e: '👧', x: 78 }
          ],
          props: ['📄', '✏️']
        },
        q: {
          en: 'You finish your worksheet before everyone else. Some children are still working. What is the best thing to do?',
          vi: 'Con làm xong phiếu bài tập trước các bạn. Vài bạn vẫn đang làm. Con nên làm gì?'
        },
        choices: [
          {
            e: '🔍',
            en: 'Check your work, then read a book quietly',
            vi: 'Kiểm tra lại bài, rồi đọc sách thật khẽ',
            v: 'best',
            why: {
              en: 'Checking helps you catch small mistakes, and reading quietly lets others keep thinking.',
              vi: 'Kiểm tra lại giúp con phát hiện lỗi nhỏ, và đọc sách khẽ khàng giúp các bạn tập trung.'
            }
          },
          {
            e: '😌',
            en: 'Sit quietly and wait for the others',
            vi: 'Ngồi yên lặng chờ các bạn',
            v: 'ok',
            why: {
              en: 'Waiting quietly is kind to the others. Checking your work first is even better — you might find a small mistake.',
              vi: 'Ngồi yên lặng chờ là tôn trọng các bạn. Kiểm tra lại bài trước thì còn tốt hơn — biết đâu con tìm ra một lỗi nhỏ.'
            }
          },
          {
            e: '📢',
            en: "Tell everyone, 'I finished first!'",
            vi: 'Nói to với cả lớp: ‘Tớ xong trước rồi!’',
            v: 'no',
            why: {
              en: 'It feels good to finish! But saying it out loud can make others feel rushed. Learning isn’t a race.',
              vi: 'Làm xong thì vui thật! Nhưng nói to như vậy có thể làm các bạn thấy sốt ruột. Học đâu phải là cuộc đua.'
            }
          },
          {
            e: '🗣️',
            en: 'Help {friend} by whispering the answers',
            vi: 'Giúp {friend} bằng cách nhắc đáp án',
            v: 'no',
            why: {
              en: 'Wanting to help is kind, but then {friend} doesn’t get to learn. If {friend} is stuck, the teacher can help.',
              vi: 'Muốn giúp bạn là tốt, nhưng như vậy {friend} không được tự học. Nếu {friend} bị bí, thầy cô sẽ giúp.'
            }
          }
        ],
        lesson: {
          en: 'Finished early? Check your work first, then do something quiet so others can think.',
          vi: 'Làm xong sớm? Kiểm tra lại bài trước, rồi làm việc gì đó thật khẽ để các bạn tập trung.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ recess and friends
  {
    id: 'life.p1-recess',
    world: 'school',
    icon: '🤸',
    title: 'Recess & new friends',
    vi: 'Giờ ra chơi & kết bạn',
    goal: 'Con biết làm quen, xin vào chơi cùng, chơi công bằng, và biết tìm thầy cô khi bị trêu chọc hay bắt nạt.',
    talk: [
      'Con sẽ nói gì để làm quen với một bạn mới? Mình tập nói thử nhé.',
      'Nếu bạn không cho con chơi cùng, con sẽ làm gì?',
      'Mách lẻo và báo thầy cô để được giúp khác nhau thế nào?'
    ],
    scenarios: [
      {
        id: 'p1-recess-hi',
        tier: 1,
        scene: '🍱🧒👋',
        pic: {
          bg: 'canteen',
          cast: [
            { e: '🧒', you: true, x: 35 },
            { e: '🧒', flip: true, x: 65 }
          ],
          props: ['🍱', '🥤']
        },
        q: {
          en: "It's your first week of P1. A child you don't know sits next to you in the canteen. What could you do?",
          vi: 'Tuần đầu vào lớp 1, có một bạn con chưa quen ngồi cạnh con ở căn-tin. Con có thể làm gì?'
        },
        choices: [
          {
            e: '👋',
            en: "Smile and say, 'Hi! What's your name?'",
            vi: 'Mỉm cười và nói: ‘Chào bạn! Bạn tên gì?’',
            v: 'best',
            why: {
              en: 'Lots of friendships start with a smile and a ‘hi’. The other child may be hoping someone will talk to them!',
              vi: 'Rất nhiều tình bạn bắt đầu từ một nụ cười và lời chào. Có khi bạn ấy cũng đang mong có ai bắt chuyện!'
            }
          },
          {
            e: '⏳',
            en: 'Wait and hope the other child talks first',
            vi: 'Chờ và mong bạn ấy bắt chuyện trước',
            v: 'ok',
            why: {
              en: 'It’s fine to feel shy. But the other child might be shy too — saying hi first is brave and kind.',
              vi: 'Ngại thì cũng không sao. Nhưng có thể bạn ấy cũng đang ngại — chủ động chào trước là dũng cảm và tử tế.'
            }
          },
          {
            e: '🙅',
            en: "Say, 'That's my friend's seat. Go away.'",
            vi: 'Nói: ‘Chỗ này của bạn tớ. Cậu đi chỗ khác đi.’',
            v: 'no',
            why: {
              en: 'Saving seats can make others feel unwelcome. There’s room for one more — and you might make a new friend!',
              vi: 'Giữ chỗ như vậy làm bạn mới thấy không được chào đón. Thêm một bạn cũng được mà — biết đâu con có thêm bạn mới!'
            }
          }
        ],
        lesson: {
          en: 'To make a new friend: smile, say hi, and ask their name.',
          vi: 'Muốn làm quen bạn mới: mỉm cười, chào bạn, và hỏi tên bạn.'
        }
      },
      {
        id: 'p1-recess-join',
        tier: 1,
        scene: '🏃🏃🧒',
        pic: {
          bg: 'schoolyard',
          cast: [
            { e: '🧒', you: true, x: 15 },
            { e: '🏃', x: 50 },
            { e: '🏃', flip: true, x: 80 }
          ]
        },
        q: {
          en: 'Some children are playing catching at recess. You want to join in. What do you do?',
          vi: 'Giờ ra chơi, mấy bạn đang chơi đuổi bắt. Con muốn chơi cùng. Con làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: "Go up and ask, 'Can I play too?'",
            vi: 'Lại gần và hỏi: ‘Cho tớ chơi với được không?’',
            v: 'best',
            why: {
              en: 'Asking is friendly and clear. Most children are happy to have one more player.',
              vi: 'Hỏi như vậy vừa thân thiện vừa rõ ràng. Phần lớn các bạn đều vui khi có thêm người chơi.'
            }
          },
          {
            e: '🏃',
            en: 'Run in and start chasing without asking',
            vi: 'Chạy vào đuổi luôn mà không hỏi',
            v: 'ok',
            why: {
              en: 'You’re keen, and that’s great. But the others might not know you’re playing and get mixed up. Asking first works better.',
              vi: 'Con hăng hái, thế là tốt. Nhưng các bạn có thể không biết con đang chơi cùng và bị rối. Hỏi trước thì hay hơn.'
            }
          },
          {
            e: '😤',
            en: "Say, 'Let me play, or I won't be your friend!'",
            vi: 'Nói: ‘Cho tớ chơi, không thì tớ không chơi với các cậu nữa!’',
            v: 'no',
            why: {
              en: 'That can make the others feel pushed, not friendly. A simple ‘Can I play too?’ works much better.',
              vi: 'Nói vậy làm các bạn thấy bị ép chứ không thấy vui. Chỉ cần hỏi ‘Cho tớ chơi với nhé?’ là hay hơn nhiều.'
            }
          }
        ],
        lesson: {
          en: "Want to join a game? Walk up, smile and ask, 'Can I play too?'",
          vi: 'Muốn chơi cùng? Lại gần, mỉm cười và hỏi: ‘Cho tớ chơi với nhé?’'
        }
      },
      {
        id: 'p1-recess-mean',
        tier: 1,
        scene: '🗯️🧒🧑‍🏫',
        pic: {
          bg: 'schoolyard',
          cast: [
            { e: '🧒', you: true, x: 30, think: '😢' },
            { e: '🧒', flip: true, x: 66, say: { en: 'Slowpoke! Slowpoke!', vi: 'Đồ rùa bò! Đồ rùa bò!' } }
          ]
        },
        q: {
          en: "A child at recess keeps calling you a mean name. You've said 'Stop it!', but it doesn't stop. What should you do?",
          vi: 'Giờ ra chơi, có một bạn cứ gọi con bằng tên xấu. Con đã nói ‘Thôi đi!’ mà bạn vẫn không dừng. Con nên làm gì?'
        },
        choices: [
          {
            e: '🧑‍🏫',
            en: 'Tell a teacher what is happening',
            vi: 'Kể cho thầy cô nghe chuyện đang xảy ra',
            v: 'best',
            why: {
              en: 'This isn’t telling tales — it’s getting help. Teachers want to know, so they can make it stop.',
              vi: 'Đây không phải là mách lẻo — mà là nhờ giúp đỡ. Thầy cô muốn biết để giúp chuyện này dừng lại.'
            }
          },
          {
            e: '🗯️',
            en: 'Call the child a mean name back',
            vi: 'Gọi lại bạn đó bằng tên xấu',
            v: 'no',
            why: {
              en: 'It’s OK to feel angry or hurt. But mean names back usually make things worse. A teacher can really help.',
              vi: 'Con thấy giận hay buồn là đương nhiên. Nhưng gọi lại tên xấu thường làm mọi chuyện tệ hơn. Thầy cô mới thật sự giúp được.'
            }
          },
          {
            e: '🤐',
            en: 'Keep it to yourself so no one gets into trouble',
            vi: 'Giữ trong lòng để không ai bị phạt',
            v: 'no',
            why: {
              en: 'You don’t have to handle it alone. Tell a teacher at school and your family at home — keep telling until it stops.',
              vi: 'Con không phải tự chịu một mình. Hãy kể với thầy cô ở trường và với bố mẹ ở nhà — cứ kể cho đến khi chuyện đó dừng lại.'
            }
          }
        ],
        lesson: {
          en: 'If someone keeps being unkind to you, tell a teacher and your family. Asking for help is brave.',
          vi: 'Nếu có bạn cứ đối xử không tốt với con, hãy kể với thầy cô và bố mẹ. Nhờ giúp đỡ là dũng cảm.'
        }
      },
      {
        id: 'p1-recess-sayno',
        tier: 2,
        value: 'resilience',
        scene: '🙅🛝🧒',
        pic: {
          bg: 'playground',
          cast: [
            { e: '🧒', you: true, x: 20 },
            { e: '🧒', flip: true, x: 56, say: { en: "No, you can't play.", vi: 'Không, cậu không được chơi.' } },
            { e: '🧒', flip: true, x: 82 }
          ]
        },
        q: {
          en: "You ask some children, 'Can I play too?' One of them says, 'No, you can't.' You feel sad. What can you do?",
          vi: 'Con hỏi mấy bạn: ‘Cho tớ chơi với được không?’ Một bạn trả lời: ‘Không được.’ Con thấy buồn. Con có thể làm gì?'
        },
        choices: [
          {
            e: '🔄',
            en: "Say 'OK', then find another game or other children to play with",
            vi: 'Nói ‘Ừ’, rồi tìm trò khác hoặc các bạn khác để chơi',
            v: 'best',
            why: {
              en: 'It’s OK to feel sad. There are lots of other children and games — and you can ask this group again another day.',
              vi: 'Buồn thì không sao cả. Còn rất nhiều bạn và trò chơi khác — hôm khác con có thể hỏi lại nhóm này.'
            }
          },
          {
            e: '🧑‍🏫',
            en: 'Tell a teacher on duty',
            vi: 'Nói với thầy cô trực',
            v: 'ok',
            why: {
              en: 'A teacher can help, especially if it keeps happening. For today, try finding another game too!',
              vi: 'Thầy cô có thể giúp, nhất là khi chuyện này cứ lặp lại. Còn hôm nay, con thử tìm trò khác nữa nhé!'
            }
          },
          {
            e: '💢',
            en: 'Push in and play anyway',
            vi: 'Cứ chen vào chơi bằng được',
            v: 'no',
            why: {
              en: 'Pushing in can start a quarrel, and the game won’t be fun. Find another game, and keep being friendly.',
              vi: 'Chen vào có thể gây cãi nhau, và trò chơi cũng chẳng vui. Tìm trò khác, và cứ thân thiện nhé.'
            }
          }
        ],
        lesson: {
          en: "If someone says no, it's OK to feel sad. Find another game or friend — and tell a teacher if it keeps happening.",
          vi: 'Bị từ chối thì buồn là bình thường. Tìm trò khác hoặc bạn khác — và báo thầy cô nếu chuyện cứ lặp lại.'
        }
      },
      {
        id: 'p1-recess-fair',
        tier: 2,
        value: 'integrity',
        scene: '🏃👆🧒',
        pic: {
          bg: 'schoolyard',
          cast: [
            { e: '🧒', you: true, x: 35 },
            { e: '🧒', flip: true, x: 62, say: { en: 'Caught you! Your turn!', vi: 'Bắt được rồi! Tới lượt cậu!' } }
          ]
        },
        q: {
          en: "You're playing catching. {friend} touches your arm — you're caught! Now it's your turn to be the catcher. What do you do?",
          vi: 'Con đang chơi đuổi bắt. {friend} chạm vào tay con — con bị bắt rồi! Giờ đến lượt con làm người đi bắt. Con làm gì?'
        },
        choices: [
          {
            e: '🙌',
            en: 'Be the catcher — everyone takes turns',
            vi: 'Làm người đi bắt — ai cũng phải đến lượt mà',
            v: 'best',
            why: {
              en: 'Playing fair means following the rules, even when you don’t like them. That’s why others enjoy playing with you.',
              vi: 'Chơi công bằng là theo đúng luật, kể cả khi mình không thích. Vì vậy các bạn mới thích chơi cùng con.'
            }
          },
          {
            e: '🙅',
            en: "Say, 'You didn't touch me!'",
            vi: 'Nói: ‘Cậu có chạm vào tớ đâu!’',
            v: 'no',
            why: {
              en: 'That isn’t true, and it isn’t fair. {friend} would feel cheated, and the game stops being fun.',
              vi: 'Nói vậy là không thật và không công bằng. {friend} sẽ thấy bị ăn gian, và trò chơi hết vui.'
            }
          },
          {
            e: '🚪',
            en: "Say 'I don't want to play any more' and walk off",
            vi: 'Nói ‘Tớ không chơi nữa’ rồi bỏ đi',
            v: 'no',
            why: {
              en: 'It’s OK to feel disappointed! But quitting each time you’re caught spoils the game. Being the catcher can be fun too!',
              vi: 'Thấy tiếc thì không sao! Nhưng hễ bị bắt là bỏ đi thì trò chơi mất vui. Làm người đi bắt cũng vui lắm đấy!'
            }
          }
        ],
        lesson: {
          en: "Play fair: follow the rules and take your turn, even when it's not the part you wanted.",
          vi: 'Chơi công bằng: theo đúng luật và nhận lượt của mình, kể cả khi đó không phải vai con thích.'
        }
      },
      {
        id: 'p1-recess-twogames',
        tier: 3,
        value: 'harmony',
        scene: '⚽🧒🦶',
        pic: {
          bg: 'schoolyard',
          cast: [
            { e: '🧒', x: 16, say: { en: "Let's play football!", vi: 'Đá bóng đi!' } },
            { e: '🧒', you: true, x: 50, think: '🤔' },
            { e: '🧒', flip: true, x: 84, say: { en: "Let's play hopscotch!", vi: 'Chơi nhảy lò cò đi!' } }
          ],
          props: ['⚽']
        },
        q: {
          en: '{name} wants you to play football. {friend} wants you to play hopscotch. Both are your friends. What could you do?',
          vi: '{name} rủ con đá bóng. {friend} rủ con chơi nhảy lò cò. Cả hai đều là bạn của con. Con có thể làm gì?'
        },
        choices: [
          {
            e: '🤝',
            en: 'Suggest all three of you play one game now, and the other one next',
            vi: 'Rủ cả ba cùng chơi một trò trước, rồi chơi trò kia sau',
            v: 'best',
            why: {
              en: 'Taking turns with games means nobody is left out, and you get to play with both friends.',
              vi: 'Thay phiên các trò chơi thì không ai bị bỏ rơi, mà con được chơi với cả hai bạn.'
            }
          },
          {
            e: '🧍',
            en: 'Play alone, so that nobody feels sad',
            vi: 'Chơi một mình để không ai buồn',
            v: 'ok',
            why: {
              en: 'You’re thinking about both friends’ feelings — that’s kind! But then you all miss out. A turn-taking plan can make everyone happy.',
              vi: 'Con nghĩ đến cảm xúc của cả hai bạn — thật tử tế! Nhưng như vậy cả ba đều thiệt. Thay phiên chơi thì ai cũng vui.'
            }
          },
          {
            e: '🙅',
            en: "Pick one, and tell the other, 'I don't want to play with you'",
            vi: 'Chọn một bạn, và nói với bạn kia: ‘Tớ không chơi với cậu đâu’',
            v: 'no',
            why: {
              en: 'Those words could really hurt. You can choose a game without saying unkind things.',
              vi: 'Câu đó có thể làm bạn rất buồn. Con có thể chọn trò chơi mà không cần nói lời làm bạn tổn thương.'
            }
          }
        ],
        lesson: {
          en: 'When friends want different things, look for a way everyone can join in: take turns, or mix the games.',
          vi: 'Khi các bạn muốn những điều khác nhau, hãy tìm cách để ai cũng được chơi: thay phiên, hoặc kết hợp các trò.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ my bag and my things
  {
    id: 'life.p1-things',
    world: 'school',
    icon: '🎒',
    title: 'My bag & my things',
    vi: 'Cặp sách và đồ dùng',
    goal: 'Con tự soạn cặp theo thời khoá biểu, giữ gìn đồ dùng có dán tên, biết tìm ở chỗ đồ thất lạc, không lấy đồ của bạn và thành thật khi quên đồ.',
    talk: [
      'Mình cùng xem thời khoá biểu: ngày mai con cần mang những sách vở gì?',
      'Nếu con làm mất bình nước ở trường, con sẽ tìm ở đâu và hỏi ai?',
      'Nếu con quên vở bài tập ở nhà, con sẽ nói gì với cô?'
    ],
    scenarios: [
      {
        id: 'p1-things-timetable',
        tier: 1,
        value: 'responsibility',
        scene: '📅🎒📚',
        pic: {
          bg: 'bedroom',
          cast: [{ e: '🧒', you: true, think: '📚❓' }],
          props: ['🎒', '📅']
        },
        q: {
          en: "It's the night before school. How do you know which books to pack for tomorrow?",
          vi: 'Tối hôm trước ngày đi học. Làm sao con biết ngày mai cần mang sách vở gì?'
        },
        choices: [
          {
            e: '📅',
            en: "Look at your class timetable for tomorrow",
            vi: 'Xem thời khoá biểu của lớp cho ngày mai',
            v: 'best',
            why: {
              en: 'The timetable shows tomorrow’s subjects, so you pack just what you need — not too heavy, nothing missing.',
              vi: 'Thời khoá biểu cho biết mai học môn gì, nên con chỉ mang đúng thứ cần — cặp không nặng, cũng không thiếu.'
            }
          },
          {
            e: '📚',
            en: 'Put every single book in your bag, just in case',
            vi: 'Bỏ hết tất cả sách vở vào cặp cho chắc',
            v: 'no',
            why: {
              en: 'Your bag would be super heavy for your back! The timetable tells you exactly what to bring.',
              vi: 'Cặp sẽ nặng lắm, đau lưng con! Thời khoá biểu cho con biết chính xác cần mang gì.'
            }
          },
          {
            e: '🤷',
            en: 'Just guess — you can borrow from friends',
            vi: 'Đoán đại — thiếu thì mượn bạn',
            v: 'no',
            why: {
              en: 'Your friends need their own books! Checking the timetable means you will have everything ready.',
              vi: 'Các bạn cũng cần sách của mình mà! Xem thời khoá biểu thì con sẽ có đủ đồ.'
            }
          }
        ],
        lesson: {
          en: 'Pack your bag the night before, using the timetable. Ask a grown-up to check it with you.',
          vi: 'Soạn cặp từ tối hôm trước theo thời khoá biểu. Nhờ bố mẹ kiểm tra cùng con.'
        }
      },
      {
        id: 'p1-things-letter',
        tier: 1,
        value: 'responsibility',
        scene: '✉️🎒🏠',
        pic: {
          bg: 'classroom',
          cast: [
            { e: '🧒', you: true, x: 35 },
            { e: '🧑‍🏫', size: 'l', flip: true, x: 72, say: { en: 'Give this to your parents.', vi: 'Con đưa thư này cho bố mẹ nhé.' } }
          ],
          props: ['✉️']
        },
        q: {
          en: 'Your teacher gives you a letter for your parents. What should you do with it?',
          vi: 'Cô giáo đưa con một tờ thông báo gửi bố mẹ. Con nên làm gì với nó?'
        },
        choices: [
          {
            e: '📂',
            en: 'Put it in your folder and give it to your grown-up when you get home',
            vi: 'Cất vào túi hồ sơ trong cặp, về nhà đưa ngay cho bố mẹ',
            v: 'best',
            why: {
              en: 'Letters often need a parent to read or sign. Keeping it in your folder means it gets home safely.',
              vi: 'Thông báo thường cần bố mẹ đọc hoặc ký. Cất vào túi hồ sơ thì tờ giấy về đến nhà an toàn.'
            }
          },
          {
            e: '✈️',
            en: 'Fold it into a paper plane',
            vi: 'Gấp thành máy bay giấy',
            v: 'no',
            why: {
              en: 'Paper planes are fun, but this letter has important news for your family. Use scrap paper for planes!',
              vi: 'Máy bay giấy thì vui thật, nhưng tờ thông báo này có tin quan trọng cho bố mẹ. Gấp máy bay bằng giấy nháp nhé!'
            }
          },
          {
            e: '🗄️',
            en: 'Leave it in your desk and take it home another day',
            vi: 'Để trong ngăn bàn, hôm nào mang về sau',
            v: 'no',
            why: {
              en: '‘Another day’ often means forgotten! Your parents might miss something important, like a trip or a form to sign.',
              vi: 'Để ‘hôm nào’ thì hay quên lắm! Bố mẹ có thể lỡ việc quan trọng, như buổi dã ngoại hay giấy cần ký.'
            }
          }
        ],
        lesson: {
          en: 'Letters from school go straight into your folder, then straight to your grown-up.',
          vi: 'Giấy tờ ở trường: cất ngay vào túi hồ sơ, về nhà đưa ngay cho bố mẹ.'
        }
      },
      {
        id: 'p1-things-borrow',
        tier: 1,
        value: 'respect',
        scene: '✏️🙏🧒',
        pic: {
          bg: 'classroom',
          cast: [
            { e: '🧒', you: true, x: 35, think: '✏️❓' },
            { e: '🧒', flip: true, x: 68 }
          ],
          props: ['✏️', '✏️']
        },
        q: {
          en: 'You open your pencil case — no pencil! {friend}, sitting next to you, has two. What do you do?',
          vi: 'Con mở hộp bút ra — không có bút chì! {friend} ngồi cạnh con có hai cây. Con làm gì?'
        },
        choices: [
          {
            e: '🙏',
            en: "Ask, '{friend}, may I borrow a pencil, please?' and give it back after",
            vi: 'Hỏi: ‘{friend} ơi, cho tớ mượn một cây bút chì nhé?’ rồi dùng xong trả lại',
            v: 'best',
            why: {
              en: 'Asking first and giving it back means {friend} will be happy to lend to you again.',
              vi: 'Hỏi trước và trả lại đàng hoàng thì lần sau {friend} vẫn vui vẻ cho con mượn.'
            }
          },
          {
            e: '🤏',
            en: "Take one from {friend}'s pencil case without asking",
            vi: 'Lấy một cây trong hộp bút của {friend} mà không hỏi',
            v: 'no',
            why: {
              en: 'Even if you mean to give it back, taking without asking can upset {friend}. Always ask first.',
              vi: 'Dù con định trả lại, lấy mà không hỏi có thể làm {friend} không vui. Luôn hỏi trước nhé.'
            }
          },
          {
            e: '😶',
            en: 'Sit and do nothing for the whole lesson',
            vi: 'Ngồi im, không làm bài cả tiết',
            v: 'no',
            why: {
              en: 'Then you would miss the lesson! Borrowing — or telling your teacher — solves the problem quickly.',
              vi: 'Như vậy con sẽ bỏ lỡ bài học! Mượn bạn — hoặc báo thầy cô — là giải quyết được ngay.'
            }
          }
        ],
        lesson: {
          en: 'Need something? Ask to borrow it, say thank you, and give it back.',
          vi: 'Cần đồ gì? Hỏi mượn, cảm ơn, và trả lại nhé.'
        }
      },
      {
        id: 'p1-things-lost',
        tier: 2,
        value: 'responsibility',
        scene: '💧❓📦',
        pic: {
          bg: 'schoolyard',
          cast: [
            { e: '🧒', you: true, x: 40, think: '❓' },
            { e: '🧑‍🏫', size: 'l', flip: true, x: 78 }
          ],
          props: ['📦']
        },
        q: {
          en: 'After PE, your water bottle is missing. What is the best thing to do?',
          vi: 'Sau giờ thể dục, bình nước của con không thấy đâu. Con nên làm gì?'
        },
        choices: [
          {
            e: '📦',
            en: 'Look in the lost-and-found box and ask your teacher for help',
            vi: 'Tìm ở thùng đồ thất lạc và nhờ thầy cô giúp',
            v: 'best',
            why: {
              en: 'Lost things often end up in lost and found. A name label helps your bottle find its way back to you.',
              vi: 'Đồ bị rơi thường được mang đến chỗ đồ thất lạc. Có dán tên thì bình nước dễ quay về với con.'
            }
          },
          {
            e: '🥤',
            en: 'Take a bottle that looks like yours',
            vi: 'Lấy một bình nước trông giống của con',
            v: 'no',
            why: {
              en: 'That bottle belongs to someone else, who will be looking for it. Check the name label, and keep looking for yours.',
              vi: 'Bình đó là của một bạn khác, bạn ấy sẽ đi tìm đấy. Hãy xem nhãn tên, và tiếp tục tìm bình của con.'
            }
          },
          {
            e: '🤫',
            en: "Say nothing and hope Mummy won't notice",
            vi: 'Không nói gì và mong mẹ không để ý',
            v: 'no',
            why: {
              en: 'Everyone loses things sometimes — it’s OK. Telling Mummy and your teacher gives you the best chance of finding it.',
              vi: 'Ai cũng có lúc làm mất đồ — không sao đâu. Kể với mẹ và thầy cô thì dễ tìm lại hơn nhiều.'
            }
          }
        ],
        lesson: {
          en: 'Label your things. If something is lost, check lost and found and ask your teacher.',
          vi: 'Dán tên lên đồ dùng. Nếu mất đồ, con tìm ở chỗ đồ thất lạc và nhờ thầy cô.'
        }
      },
      {
        id: 'p1-things-forgot',
        tier: 2,
        value: 'integrity',
        scene: '📒🏠😬',
        pic: {
          bg: 'classroom',
          cast: [
            { e: '🧒', you: true, x: 30, think: '😬' },
            { e: '🧑‍🏫', size: 'l', flip: true, x: 72, say: { en: 'Please hand in your homework.', vi: 'Các con nộp bài tập nhé.' } }
          ]
        },
        q: {
          en: 'Your teacher asks for your homework. Oh no — you left it at home! What do you say?',
          vi: 'Cô thu bài tập về nhà. Ôi không — con để quên ở nhà rồi! Con nói gì?'
        },
        choices: [
          {
            e: '🙇',
            en: "'Sorry, Teacher, I left it at home. I'll bring it tomorrow.'",
            vi: '‘Em xin lỗi cô, em để quên ở nhà. Mai em mang đến ạ.’',
            v: 'best',
            why: {
              en: 'Telling the truth is the right thing, and your teacher will be glad you were honest. Everyone forgets sometimes.',
              vi: 'Nói thật là đúng, và cô sẽ quý con vì con thành thật. Ai cũng có lúc quên mà.'
            }
          },
          {
            e: '🙅',
            en: "'We didn't get any homework.'",
            vi: '‘Hôm qua không có bài tập về nhà ạ.’',
            v: 'no',
            why: {
              en: 'That isn’t true, and it can make your teacher trust you less. Telling the truth is easier — and builds trust.',
              vi: 'Điều đó không đúng, và có thể làm cô bớt tin con. Nói thật thì dễ hơn — và giúp cô tin con.'
            }
          },
          {
            e: '🫣',
            en: 'Hide behind your bag and hope your teacher forgets',
            vi: 'Nấp sau cặp và mong cô quên mất',
            v: 'no',
            why: {
              en: 'Hiding makes the worried feeling grow. It’s OK to forget sometimes — just tell your teacher honestly.',
              vi: 'Trốn tránh chỉ làm con càng lo hơn. Thỉnh thoảng quên cũng không sao — cứ thật thà nói với cô.'
            }
          }
        ],
        lesson: {
          en: 'Forgot something? Tell your teacher honestly and bring it tomorrow. Tip: put finished homework straight into your bag.',
          vi: 'Quên đồ? Thật thà báo với cô và mai mang đến. Mẹo: làm bài xong là cất ngay vào cặp.'
        }
      },
      {
        id: 'p1-things-lookalike',
        tier: 3,
        value: 'respect',
        scene: '📏🔍🧒',
        pic: {
          bg: 'classroom',
          cast: [
            { e: '🧒', you: true, x: 30, think: '📏❓' },
            { e: '🧒', flip: true, x: 68 }
          ],
          props: [{ e: '📏', x: 72, y: 66 }]
        },
        q: {
          en: "Your favourite ruler is missing. Then you see one just like it on {friend}'s desk. What is the best thing to do?",
          vi: 'Cây thước kẻ yêu thích của con không thấy đâu. Rồi con thấy một cây giống hệt trên bàn của {friend}. Con nên làm gì?'
        },
        choices: [
          {
            e: '💬',
            en: "Ask kindly, 'Is that yours? Mine is missing,' and look for a name label",
            vi: 'Hỏi nhẹ nhàng: ‘Thước của cậu à? Tớ bị mất một cây giống vậy’, rồi xem nhãn tên',
            v: 'best',
            why: {
              en: 'Lots of rulers look alike. Asking kindly and checking the name label finds out the truth without hurt feelings.',
              vi: 'Nhiều cây thước trông giống nhau lắm. Hỏi nhẹ nhàng và xem nhãn tên giúp tìm ra sự thật mà không ai buồn.'
            }
          },
          {
            e: '🧑‍🏫',
            en: 'Tell your teacher that your ruler is missing',
            vi: 'Báo với thầy cô là con bị mất thước',
            v: 'ok',
            why: {
              en: 'Your teacher can help, especially if you can’t sort it out. A friendly question to {friend} first is often the quickest way.',
              vi: 'Thầy cô có thể giúp, nhất là khi con không tự giải quyết được. Hỏi {friend} nhẹ nhàng trước thường là cách nhanh nhất.'
            }
          },
          {
            e: '✊',
            en: 'Grab it back — it looks just like yours',
            vi: 'Giật lại ngay — trông y hệt của con mà',
            v: 'no',
            why: {
              en: 'It might really be {friend}’s! Grabbing could start a quarrel. Ask first, and look for your name.',
              vi: 'Có thể đó đúng là của {friend}! Giật lại dễ gây cãi nhau. Hãy hỏi trước, và xem có tên con không.'
            }
          },
          {
            e: '📢',
            en: 'Tell everyone that {friend} took your ruler',
            vi: 'Nói với cả lớp là {friend} lấy thước của con',
            v: 'no',
            why: {
              en: 'You aren’t sure yet, and {friend} could feel very hurt. Ask kindly, or ask your teacher to help.',
              vi: 'Con chưa chắc chắn, và {friend} có thể rất buồn. Hãy hỏi nhẹ nhàng, hoặc nhờ thầy cô giúp.'
            }
          }
        ],
        lesson: {
          en: 'Things can look alike. Ask kindly before you decide — and label your things so you can tell them apart.',
          vi: 'Đồ dùng có thể giống nhau. Hãy hỏi nhẹ nhàng trước khi kết luận — và dán tên lên đồ để dễ nhận ra.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ to and from school
  {
    id: 'life.p1-home-time',
    world: 'school',
    icon: '🚌',
    title: 'To and from school',
    vi: 'Đi học và tan học',
    goal: 'Con biết nề nếp buổi sáng và giờ tan học: đi học đúng giờ, chào cờ, đi xe buýt trường, chờ ở đúng chỗ đón và chỉ về với người đã hẹn.',
    talk: [
      'Hôm nay ai sẽ đón con, và đón ở đâu? Nếu chưa thấy người đón, con sẽ làm gì?',
      'Nếu có người quen (không phải người đã hẹn) rủ con về cùng, con sẽ nói gì?',
      'Tối nay mình chuẩn bị những gì để sáng mai không bị trễ?'
    ],
    scenarios: [
      {
        id: 'p1-home-bus',
        tier: 1,
        value: 'responsibility',
        scene: '🚌👋🧒',
        pic: {
          bg: 'schoolgate',
          cast: [
            { e: '🚌', size: 'l', x: 14 },
            { e: '👩', x: 36, say: { en: 'The bus is leaving soon!', vi: 'Xe sắp chạy rồi nhé!' } },
            { e: '🧒', you: true, x: 60 },
            { e: '🧒', flip: true, x: 88 }
          ]
        },
        q: {
          en: 'School is over. Your school bus is waiting, and you see {friend} on the field. You want to say goodbye. What do you do?',
          vi: 'Tan học rồi. Xe buýt trường đang đợi, và con thấy {friend} ở ngoài sân. Con muốn chào tạm biệt bạn. Con làm gì?'
        },
        choices: [
          {
            e: '🚌',
            en: 'Get on the bus straight away and wave from the window',
            vi: 'Lên xe buýt ngay và vẫy tay chào qua cửa sổ',
            v: 'best',
            why: {
              en: 'The bus leaves on time, and the bus auntie or uncle is counting every child. A wave works just as well!',
              vi: 'Xe buýt chạy đúng giờ, và cô chú phụ xe đang đếm từng bạn. Vẫy tay chào cũng vui y như vậy!'
            }
          },
          {
            e: '🏃',
            en: 'Run over to {friend} quickly, then come back',
            vi: 'Chạy nhanh ra chỗ {friend}, rồi quay lại',
            v: 'no',
            why: {
              en: 'The bus might have to wait or leave, and the bus auntie or uncle would worry. You can say bye tomorrow!',
              vi: 'Xe có thể phải chờ hoặc chạy mất, và cô chú phụ xe sẽ rất lo. Mai con chào bạn cũng được mà!'
            }
          },
          {
            e: '🙏',
            en: 'Ask the driver to wait while you go',
            vi: 'Nhờ bác tài chờ con đi một lát',
            v: 'no',
            why: {
              en: 'Lots of children on the bus need to get home. Get on, buckle up, and wave goodbye from your seat.',
              vi: 'Nhiều bạn trên xe cũng cần về nhà. Lên xe, thắt dây an toàn, rồi vẫy tay chào từ chỗ ngồi nhé.'
            }
          }
        ],
        lesson: {
          en: "When it's bus time, go straight to the bus. Wave goodbye from your seat!",
          vi: 'Đến giờ xe buýt, con đi thẳng ra xe. Vẫy tay chào bạn từ chỗ ngồi nhé!'
        }
      },
      {
        id: 'p1-home-wait',
        tier: 1,
        scene: '🏫⏳🧒',
        pic: {
          bg: 'schoolgate',
          cast: [
            { e: '🧒', you: true, x: 35, think: '👀' },
            { e: '🧑‍🏫', size: 'l', flip: true, x: 72 }
          ]
        },
        q: {
          en: "School is over. You go to the pick-up point, but your grown-up isn't there yet. What do you do?",
          vi: 'Tan học, con ra chỗ chờ đón nhưng chưa thấy người đón con đâu. Con làm gì?'
        },
        choices: [
          {
            e: '🧑‍🏫',
            en: 'Wait at the pick-up point, where the teachers can see you',
            vi: 'Chờ ở chỗ đón, nơi thầy cô nhìn thấy con',
            v: 'best',
            why: {
              en: 'Your grown-up knows to find you there, and a teacher can help if they are late.',
              vi: 'Người đón biết sẽ tìm con ở đó, và thầy cô sẽ giúp nếu người đón đến muộn.'
            }
          },
          {
            e: '🚶',
            en: 'Start walking home by yourself',
            vi: 'Tự đi bộ về nhà',
            v: 'no',
            why: {
              en: 'Your grown-up would come and not find you, and that would be very worrying. Stay at the pick-up point.',
              vi: 'Người đón đến mà không thấy con thì sẽ lo lắm. Con cứ ở chỗ chờ đón nhé.'
            }
          },
          {
            e: '🛝',
            en: 'Go to the playground with {friend} while you wait',
            vi: 'Ra sân chơi với {friend} trong lúc chờ',
            v: 'no',
            why: {
              en: 'Your grown-up won’t know where to look. Stay where your grown-up and teachers can see you — you can chat with {friend} there!',
              vi: 'Người đón sẽ không biết tìm con ở đâu. Hãy ở chỗ người đón và thầy cô nhìn thấy — con vẫn nói chuyện với {friend} được mà!'
            }
          }
        ],
        lesson: {
          en: 'After school, wait at the pick-up point until your grown-up comes. If they are late, tell a teacher.',
          vi: 'Tan học, con chờ ở chỗ đón cho đến khi người đón tới. Nếu người đón đến muộn, con báo thầy cô nhé.'
        }
      },
      {
        id: 'p1-home-ontime',
        tier: 2,
        value: 'responsibility',
        scene: '⏰🌙👕',
        pic: {
          bg: 'bedroom',
          cast: [{ e: '🧒', you: true, think: '⏰' }],
          props: ['👕', '🎒']
        },
        q: {
          en: 'School starts early in the morning. What will help you be ready on time?',
          vi: 'Trường bắt đầu học từ rất sớm. Điều gì giúp con sẵn sàng đúng giờ?'
        },
        choices: [
          {
            e: '🌙',
            en: 'Go to bed early, and get your uniform and bag ready the night before',
            vi: 'Đi ngủ sớm, và chuẩn bị sẵn đồng phục, cặp sách từ tối hôm trước',
            v: 'best',
            why: {
              en: 'A good sleep and a ready bag make mornings easy. Being on time means you don’t miss the start of the day.',
              vi: 'Ngủ đủ giấc và cặp sách sẵn sàng giúp buổi sáng nhẹ nhàng. Đúng giờ thì con không bỏ lỡ đầu buổi học.'
            }
          },
          {
            e: '🌅',
            en: 'Get everything ready in the morning',
            vi: 'Sáng mai mới chuẩn bị mọi thứ',
            v: 'ok',
            why: {
              en: 'That can work, but mornings are rushed and things get forgotten. Getting ready the night before is calmer.',
              vi: 'Cũng được, nhưng buổi sáng thường vội và dễ quên đồ. Chuẩn bị từ tối hôm trước thì thong thả hơn.'
            }
          },
          {
            e: '🎮',
            en: 'Stay up late to finish your game',
            vi: 'Thức khuya chơi cho xong trò chơi',
            v: 'no',
            why: {
              en: 'Then it’s very hard to wake up, and you’ll feel sleepy in class. Your game can wait till tomorrow.',
              vi: 'Như vậy sáng mai sẽ rất khó dậy, và con sẽ buồn ngủ trong lớp. Trò chơi để mai chơi tiếp nhé.'
            }
          }
        ],
        lesson: {
          en: 'Sleep early and get ready the night before. Calm mornings mean you arrive on time.',
          vi: 'Ngủ sớm và chuẩn bị từ tối hôm trước. Buổi sáng thong thả thì con đến trường đúng giờ.'
        }
      },
      {
        id: 'p1-home-anthem',
        tier: 2,
        region: 'SG',
        value: 'respect',
        scene: '🇸🇬🎶🧍',
        pic: {
          bg: 'schoolyard',
          cast: [
            { e: '🧒', x: 20 },
            { e: '🧒', you: true, x: 45 },
            { e: '🧒', x: 70 }
          ],
          props: [
            { e: '🇸🇬', x: 88, y: 22, size: 'm' },
            { e: '🎶', x: 60, y: 18 }
          ]
        },
        q: {
          en: "Every morning at school, the national anthem, 'Majulah Singapura', plays as the flag goes up. What do you do?",
          vi: 'Mỗi sáng ở trường, khi lá cờ được kéo lên, bài quốc ca ‘Majulah Singapura’ vang lên. Con làm gì?'
        },
        choices: [
          {
            e: '🧍',
            en: 'Stand tall and still, face the flag, and sing with your class',
            vi: 'Đứng thẳng, nghiêm trang, hướng về lá cờ và hát cùng cả lớp',
            v: 'best',
            why: {
              en: 'Standing still for the anthem shows respect for Singapore — the country where you live and learn.',
              vi: 'Đứng nghiêm khi hát quốc ca là thể hiện sự tôn trọng với Singapore — nơi con đang sống và học tập.'
            }
          },
          {
            e: '💬',
            en: 'Chat quietly with {friend}',
            vi: 'Thì thầm nói chuyện với {friend}',
            v: 'no',
            why: {
              en: 'The anthem is a special moment. Save your chat for recess — {friend} will still be there!',
              vi: 'Lúc hát quốc ca là khoảnh khắc trang trọng. Để dành chuyện cho giờ ra chơi nhé — {friend} vẫn ở đó mà!'
            }
          },
          {
            e: '🎒',
            en: 'Quickly sort out your bag so you are ready for class',
            vi: 'Tranh thủ xếp lại cặp cho sẵn sàng vào học',
            v: 'no',
            why: {
              en: 'Being ready is good, but during the anthem everyone stops and stands still. Sort out your bag afterwards.',
              vi: 'Chuẩn bị sẵn là tốt, nhưng khi hát quốc ca mọi người đều dừng lại và đứng nghiêm. Xếp cặp sau nhé.'
            }
          }
        ],
        lesson: {
          en: 'When the national anthem plays, stop what you are doing, stand tall and still, and face the flag.',
          vi: 'Khi quốc ca vang lên, con dừng mọi việc, đứng thẳng nghiêm trang và hướng về lá cờ.'
        }
      },
      {
        id: 'p1-home-asleep',
        tier: 2,
        scene: '🚌😴❓',
        pic: {
          bg: 'bus',
          cast: [
            { e: '🧒', you: true, x: 35, think: '😴❓' },
            { e: '👩', size: 'l', flip: true, x: 75 }
          ]
        },
        q: {
          en: "You fall asleep on the school bus. When you wake up, you don't know where you are. What should you do?",
          vi: 'Con ngủ quên trên xe buýt trường. Tỉnh dậy, con không biết xe đang ở đâu. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Stay in your seat and ask the bus auntie or uncle',
            vi: 'Ngồi yên tại chỗ và hỏi cô chú phụ xe',
            v: 'best',
            why: {
              en: 'The bus auntie or uncle knows where every child gets off, and will make sure you get home.',
              vi: 'Cô chú phụ xe biết điểm xuống của từng bạn và sẽ đưa con về đến nơi.'
            }
          },
          {
            e: '😌',
            en: 'Stay in your seat and wait quietly',
            vi: 'Ngồi yên tại chỗ và chờ',
            v: 'ok',
            why: {
              en: 'Staying on the bus is right. But you don’t have to sit and worry — asking the bus auntie or uncle helps you feel sure.',
              vi: 'Ngồi yên trên xe là đúng. Nhưng con không cần ngồi lo một mình — hỏi cô chú phụ xe sẽ giúp con yên tâm.'
            }
          },
          {
            e: '🚪',
            en: 'Get off at the next stop and walk home',
            vi: 'Xuống xe ở điểm dừng tiếp theo rồi đi bộ về',
            v: 'no',
            why: {
              en: 'You might be far from home, in a place you don’t know. Stay on the bus — the grown-ups will get you home safely.',
              vi: 'Có thể con đang ở xa nhà, ở chỗ con không biết. Cứ ngồi trên xe — người lớn sẽ đưa con về an toàn.'
            }
          }
        ],
        lesson: {
          en: "On the school bus, stay in your seat. If you're not sure, ask the bus auntie or uncle.",
          vi: 'Trên xe buýt trường, con ngồi yên tại chỗ. Nếu không chắc, hỏi cô chú phụ xe nhé.'
        }
      },
      {
        id: 'p1-home-plan',
        tier: 3,
        scene: '🏫🚗❓',
        pic: {
          bg: 'schoolgate',
          cast: [
            { e: '🧒', you: true, x: 22 },
            { e: '🧒', flip: true, x: 48 },
            { e: '👩', size: 'l', flip: true, x: 76, say: { en: 'Come home with us!', vi: 'Con về cùng cô nhé!' } }
          ]
        },
        q: {
          en: "Mummy is late. {friend}'s mummy, who you know well, says, 'Come home with us — I'm sure it's fine!' What do you do?",
          vi: 'Mẹ đến đón muộn. Mẹ của {friend}, người con biết rõ, bảo: ‘Con về cùng cô nhé — chắc là không sao đâu!’ Con làm gì?'
        },
        choices: [
          {
            e: '🧑‍🏫',
            en: "Say, 'Thank you, but I need to check first,' and ask your teacher to call Mummy",
            vi: 'Nói: ‘Con cảm ơn cô, nhưng con phải hỏi mẹ trước ạ’, rồi nhờ thầy cô gọi cho mẹ',
            v: 'best',
            why: {
              en: 'Only go with the grown-up in your plan. If the plan changes, Mummy or your teacher must tell you first.',
              vi: 'Con chỉ về với người đã hẹn đón con. Nếu có thay đổi, mẹ hoặc thầy cô phải báo cho con trước.'
            }
          },
          {
            e: '🚗',
            en: "Go with them — you know {friend}'s mummy",
            vi: 'Đi theo luôn — con biết mẹ của {friend} mà',
            v: 'no',
            why: {
              en: '{friend}’s mummy is kind, but Mummy doesn’t know about the change and would be very worried. Always check first.',
              vi: 'Mẹ của {friend} rất tốt, nhưng mẹ con không biết chuyện này và sẽ rất lo. Luôn hỏi trước nhé.'
            }
          },
          {
            e: '🚶',
            en: 'Go out of the school gate to look for Mummy',
            vi: 'Ra ngoài cổng trường tìm mẹ',
            v: 'no',
            why: {
              en: 'Outside the gate is busy, and Mummy will look for you at the pick-up point. Stay there with your teacher.',
              vi: 'Ngoài cổng trường rất đông, và mẹ sẽ tìm con ở chỗ chờ đón. Con cứ ở đó với thầy cô.'
            }
          }
        ],
        lesson: {
          en: 'Only go home with the grown-up in your plan. If anything changes, check with your teacher first.',
          vi: 'Con chỉ về với người đã hẹn đón. Nếu có gì thay đổi, hỏi thầy cô trước.'
        }
      }
    ]
  }
];
