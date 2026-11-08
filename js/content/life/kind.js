// World: kind — see README.md in this folder for the format.
export const TOPICS = [
  // ------------------------------------------------------------------ honesty & promises
  {
    id: 'life.honest',
    world: 'kind',
    icon: '💎',
    title: 'Honest & true to my word',
    vi: 'Trung thực và giữ lời hứa',
    goal: 'Con dám nói thật kể cả khi lỡ làm sai, không giữ đồ không phải của mình, chơi đúng luật và giữ lời đã hứa.',
    talk: [
      'Có lần nào con lỡ làm hỏng đồ chưa? Lúc đó con thấy thế nào, và con đã làm gì?',
      'Nếu con nhặt được tiền ở siêu thị, con sẽ làm gì?',
      'Vì sao chơi đúng luật lại vui hơn ăn gian, kể cả khi mình bị thua?',
      'Khi ai đó giữ đúng lời hứa với con, con thấy thế nào?'
    ],
    scenarios: [
      {
        id: 'honest-cup',
        tier: 1,
        value: 'integrity',
        scene: '☕💥🙊',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '😟' }, { e: '⚽', size: 's' }], props: ['☕', '💥'] },
        q: {
          en: "You are playing ball inside the house. The ball knocks Grandma's favourite cup off the table and it breaks. Nobody saw. What should you do?",
          vi: 'Con chơi bóng trong nhà. Quả bóng làm rơi cái cốc bà thích nhất và cốc bị vỡ. Không ai nhìn thấy. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙈',
            en: 'Hide the pieces under the sofa so nobody finds out',
            vi: 'Giấu mảnh vỡ xuống gầm ghế sô-pha để không ai biết',
            v: 'no',
            why: {
              en: 'Someone could step on the sharp pieces and get hurt. And a hidden mistake keeps feeling heavy inside you.',
              vi: 'Có người có thể giẫm phải mảnh vỡ sắc và bị đau. Mà lỗi càng giấu thì trong lòng con càng nặng nề.'
            }
          },
          {
            e: '🙋',
            en: 'Tell Grandma what happened and say sorry',
            vi: 'Kể cho bà nghe chuyện đã xảy ra và xin lỗi bà',
            v: 'best',
            why: {
              en: 'Telling the truth takes courage. Grandma may be sad about the cup, but glad you were honest — and she can clear the sharp bits safely.',
              vi: 'Nói thật cần can đảm lắm. Bà có thể tiếc cái cốc, nhưng sẽ vui vì con trung thực — và bà sẽ dọn mảnh vỡ cho an toàn.'
            }
          },
          {
            e: '💨',
            en: 'Say the wind blew it off the table',
            vi: 'Nói là gió thổi làm cốc rơi',
            v: 'no',
            why: {
              en: "That isn't what happened. After a fib, Grandma may find it harder to believe you next time.",
              vi: 'Chuyện không phải như vậy. Nếu con nói dối, lần sau bà sẽ khó tin lời con hơn.'
            }
          }
        ],
        lesson: {
          en: 'Broke something by accident? Tell a grown-up the truth. Everyone makes mistakes — being honest is what matters.',
          vi: 'Lỡ làm vỡ đồ? Hãy nói thật với người lớn. Ai cũng có lúc mắc lỗi, quan trọng là con trung thực.'
        }
      },
      {
        id: 'honest-cookie',
        tier: 1,
        value: 'integrity',
        scene: '🍪👨❓',
        pic: {
          bg: 'kitchen',
          cast: [
            { e: '🧒', you: true, think: '🍪😬' },
            { e: '👨', size: 'l', say: { en: 'Who ate the last cookie?', vi: 'Ai ăn cái bánh cuối cùng thế?' } }
          ]
        },
        q: {
          en: 'You ate the last cookie without asking. Daddy looks in the tin and asks, "Who ate the last cookie?" What do you say?',
          vi: 'Con đã ăn chiếc bánh quy cuối cùng mà không xin phép. Bố nhìn vào hộp và hỏi: "Ai ăn cái bánh cuối cùng thế?" Con nói gì?'
        },
        choices: [
          {
            e: '🤷',
            en: '"I don\'t know!"',
            vi: '"Con không biết ạ!"',
            v: 'no',
            why: {
              en: "That isn't true, and Daddy may keep wondering who took it. The truth is quicker and kinder.",
              vi: 'Như vậy là không thật, và bố sẽ cứ thắc mắc ai đã ăn. Nói thật thì nhanh gọn và tử tế hơn.'
            }
          },
          {
            e: '👉',
            en: '"It wasn\'t me — my little cousin ate it!"',
            vi: '"Không phải con — em họ con ăn đấy!"',
            v: 'no',
            why: {
              en: "Then your cousin could be told off for something they didn't do. That isn't fair.",
              vi: 'Như vậy em họ có thể bị mắng oan vì việc em không làm. Thế thì không công bằng.'
            }
          },
          {
            e: '🙋',
            en: '"It was me, Daddy. Sorry I didn\'t ask."',
            vi: '"Con ăn đấy ạ. Con xin lỗi vì không xin phép bố."',
            v: 'best',
            why: {
              en: 'Owning up is brave. Daddy knows he can trust what you say — and next time, you can ask first.',
              vi: 'Dám nhận là con rất dũng cảm. Bố biết luôn tin được lời con — và lần sau con nhớ xin phép trước nhé.'
            }
          }
        ],
        lesson: {
          en: 'Did something you shouldn\'t? Say "It was me, sorry." Owning up helps people trust you.',
          vi: 'Lỡ làm điều chưa đúng? Hãy nói "Con làm đấy ạ, con xin lỗi." Dám nhận lỗi thì mọi người sẽ tin con.'
        }
      },
      {
        id: 'honest-money',
        tier: 2,
        value: 'integrity',
        scene: '💵🛒🔍',
        pic: { bg: 'supermarket', cast: [{ e: '🧒', you: true, think: '💵❓' }], props: ['💵'] },
        q: {
          en: 'At the supermarket, you find some money on the floor. Nobody is nearby. What should you do?',
          vi: 'Ở siêu thị, con nhặt được một tờ tiền rơi trên sàn. Xung quanh không có ai. Con nên làm gì?'
        },
        choices: [
          {
            e: '🚶',
            en: 'Leave it on the floor and walk on',
            vi: 'Để nguyên trên sàn rồi đi tiếp',
            v: 'ok',
            why: {
              en: "You didn't take it. But someone else might! Telling a grown-up gives the money the best chance of getting back to its owner.",
              vi: 'Con không lấy. Nhưng người khác có thể nhặt mất! Báo người lớn thì tiền dễ về với người đánh rơi hơn.'
            }
          },
          {
            e: '🙋',
            en: 'Show your grown-up and hand it in at the counter',
            vi: 'Đưa bố mẹ xem, rồi cùng mang ra quầy để gửi lại',
            v: 'best',
            why: {
              en: 'The person who dropped it may come back to ask. The shop can give it back to them.',
              vi: 'Người đánh rơi có thể sẽ quay lại hỏi. Cửa hàng sẽ trả lại cho họ.'
            }
          },
          {
            e: '🤫',
            en: 'Put it in your pocket — finders keepers, nobody saw!',
            vi: 'Cho vào túi — ai nhặt được là của người đó, có ai thấy đâu!',
            v: 'no',
            why: {
              en: "Someone lost that money and may be worried. Keeping it is like taking something that isn't yours.",
              vi: 'Có người đánh rơi số tiền đó và đang lo lắm. Giữ lại cũng giống như lấy đồ không phải của mình.'
            }
          }
        ],
        lesson: {
          en: "Found something that isn't yours? Tell your grown-up and hand it in, so it can go back to its owner.",
          vi: 'Nhặt được đồ không phải của mình? Báo bố mẹ và gửi lại đúng chỗ, để đồ về với người đánh mất.'
        }
      },
      {
        id: 'honest-snakes',
        tier: 2,
        value: 'integrity',
        scene: '🎲🐍👀',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '🐍😟' }, { e: '🧒', flip: true, think: '🥤' }], props: ['🎲'] },
        q: {
          en: "You are playing Snakes and Ladders with {friend}. You roll a 3 — you'll land on a snake! {friend} isn't looking. What do you do?",
          vi: 'Con đang chơi cờ Rắn và Thang với bạn {friend}. Con gieo được 3 — sắp rơi vào ô có rắn! Bạn {friend} không nhìn. Con làm gì?'
        },
        choices: [
          {
            e: '🤫',
            en: 'Move 4 squares instead, to miss the snake',
            vi: 'Đi 4 ô cho khỏi gặp rắn',
            v: 'no',
            why: {
              en: "That's cheating, even if nobody sees. A win that isn't real doesn't feel good for long — and {friend} would feel tricked.",
              vi: 'Như thế là ăn gian, dù không ai thấy. Thắng mà không thật thì chẳng vui được lâu — và bạn {friend} sẽ thấy bị lừa.'
            }
          },
          {
            e: '🐍',
            en: 'Move 3 squares and slide down the snake',
            vi: 'Đi đúng 3 ô và trượt xuống theo con rắn',
            v: 'best',
            why: {
              en: "Games are only fun when everyone follows the same rules. And maybe you'll find a ladder next!",
              vi: 'Trò chơi chỉ vui khi ai cũng theo cùng một luật. Biết đâu lượt sau con gặp cái thang!'
            }
          },
          {
            e: '🎲',
            en: '"Oops, my dice fell off. I\'ll roll again!"',
            vi: '"Ối, xúc xắc rơi rồi. Để tớ gieo lại!"',
            v: 'no',
            why: {
              en: 'Pretending is a sneaky way to cheat. Real players take the snakes along with the ladders.',
              vi: 'Giả vờ như vậy cũng là ăn gian một cách lén lút. Người chơi thật thì gặp rắn hay gặp thang đều vui vẻ nhận.'
            }
          }
        ],
        lesson: {
          en: 'Play fair, even when nobody is looking. Fair play makes games fun and helps friends trust you.',
          vi: 'Chơi đúng luật, kể cả khi không ai nhìn. Chơi đẹp thì trò chơi mới vui và bạn bè mới tin con.'
        }
      },
      {
        id: 'honest-plants',
        tier: 2,
        value: 'responsibility',
        scene: '🌱💧📺',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '🌱💧' }, { e: '📺', size: 'l' }], props: ['🌱', '🌱'] },
        q: {
          en: 'You promised Mummy you would water the plants after your show. The show ends, and another one starts. What do you do?',
          vi: 'Con đã hứa với mẹ là xem xong chương trình sẽ đi tưới cây. Chương trình hết, rồi một chương trình khác lại bắt đầu. Con làm gì?'
        },
        choices: [
          {
            e: '💧',
            en: 'Turn off the TV and go and water the plants',
            vi: 'Tắt TV và đi tưới cây',
            v: 'best',
            why: {
              en: 'You kept your promise! Mummy knows she can count on you, and the plants get their drink.',
              vi: 'Con đã giữ lời hứa! Mẹ biết là có thể tin cậy con, còn cây thì được uống nước.'
            }
          },
          {
            e: '📺',
            en: 'Keep watching — Mummy might forget',
            vi: 'Xem tiếp — biết đâu mẹ quên',
            v: 'no',
            why: {
              en: 'The plants would stay thirsty. And a promise is still a promise, even if nobody reminds you.',
              vi: 'Cây sẽ bị khát nước. Mà lời hứa vẫn là lời hứa, dù không ai nhắc con.'
            }
          },
          {
            e: '⏳',
            en: 'Ask Mummy, "Can I water them after this show?"',
            vi: 'Hỏi mẹ: "Con xem nốt chương trình này rồi tưới cây được không ạ?"',
            v: 'ok',
            why: {
              en: 'Asking is much better than forgetting. But you already made a promise — keeping it first is even better.',
              vi: 'Hỏi mẹ vẫn tốt hơn là quên. Nhưng con đã hứa rồi — giữ đúng lời hứa trước thì còn tốt hơn nữa.'
            }
          }
        ],
        lesson: {
          en: 'A promise means people can count on you. Do what you said, even when something fun comes along.',
          vi: 'Lời hứa giúp mọi người tin cậy con. Đã nói thì làm, kể cả khi có việc khác vui hơn.'
        }
      },
      {
        id: 'honest-cousin',
        tier: 3,
        value: 'integrity',
        scene: '🧱🤝⚽',
        pic: {
          bg: 'home',
          cast: [
            { e: '👶', size: 's', think: '🧱' },
            { e: '🧒', you: true, think: '❓' },
            { e: '🧒', say: { en: "Let's go to the playground!", vi: 'Ra sân chơi đi!' } }
          ],
          props: ['🧱']
        },
        q: {
          en: 'You promised your little cousin you would build blocks together after lunch. Then {friend} asks you to go to the playground. What do you do?',
          vi: 'Con đã hứa với em họ là ăn trưa xong sẽ cùng xếp hình. Rồi bạn {friend} rủ con ra sân chơi. Con làm gì?'
        },
        choices: [
          {
            e: '💬',
            en: 'Ask your cousin kindly if you can build blocks another time',
            vi: 'Nhẹ nhàng hỏi em xem để lúc khác xếp hình có được không',
            v: 'ok',
            why: {
              en: 'Asking honestly is much better than just leaving. But your cousin may feel let down — keeping your promise is kinder.',
              vi: 'Hỏi thật lòng thì tốt hơn nhiều so với bỏ đi. Nhưng em có thể thất vọng — giữ lời hứa thì tử tế hơn.'
            }
          },
          {
            e: '🏃',
            en: 'Run off to the playground without telling your cousin',
            vi: 'Chạy ra sân chơi mà không nói gì với em',
            v: 'no',
            why: {
              en: 'Your cousin would wait and wait, and feel forgotten. A broken promise with no word can really hurt.',
              vi: 'Em sẽ chờ mãi và thấy mình bị bỏ quên. Thất hứa mà không nói một lời có thể làm em buồn lắm.'
            }
          },
          {
            e: '🧱',
            en: 'Keep your promise, and ask {friend} to play another day',
            vi: 'Giữ lời hứa với em, và hẹn bạn {friend} hôm khác',
            v: 'best',
            why: {
              en: 'Your cousin was looking forward to it. Keeping your word shows you care — and {friend} can play with you another time.',
              vi: 'Em đang mong được chơi với con. Giữ lời cho thấy con quan tâm đến em — còn bạn {friend} thì hôm khác chơi cũng được.'
            }
          }
        ],
        lesson: {
          en: "Keep your promises. If you really must change one, talk honestly first — don't just disappear.",
          vi: 'Hãy giữ lời hứa. Nếu thật sự phải đổi, hãy nói thật lòng trước — đừng lặng lẽ bỏ đi.'
        }
      },
      {
        id: 'honest-drawing',
        tier: 3,
        value: 'integrity',
        scene: '🎨👵😊',
        pic: {
          bg: 'home',
          cast: [
            { e: '🧒', you: true },
            { e: '🧒' },
            { e: '👵', size: 'l', say: { en: 'Did you draw it all by yourself?', vi: 'Cháu tự vẽ hết đấy à?' } }
          ],
          props: ['🎨', '🖍️']
        },
        q: {
          en: '{friend} helped you a lot with your drawing. Grandma sees it and says, "Wow! Did you draw this all by yourself?" What do you say?',
          vi: 'Bạn {friend} đã giúp con vẽ rất nhiều. Bà xem bức tranh và khen: "Ôi! Cháu tự vẽ hết đấy à?" Con nói gì?'
        },
        choices: [
          {
            e: '🙋',
            en: '"Yes! I did it all by myself!"',
            vi: '"Vâng! Cháu tự vẽ hết đấy ạ!"',
            v: 'no',
            why: {
              en: "That isn't quite true. Taking all the praise when {friend} helped isn't fair to your friend.",
              vi: 'Như vậy là chưa đúng sự thật. Nhận hết lời khen trong khi bạn {friend} đã giúp thì không công bằng với bạn.'
            }
          },
          {
            e: '🤝',
            en: '"Thanks! {friend} helped me a lot."',
            vi: '"Cháu cảm ơn bà! Bạn {friend} giúp cháu nhiều lắm ạ."',
            v: 'best',
            why: {
              en: "You took the kind words and shared them. That's honest, and fair to {friend} too.",
              vi: 'Con vừa nhận lời khen vừa chia sẻ với bạn. Như vậy là trung thực, và công bằng với bạn {friend} nữa.'
            }
          },
          {
            e: '😊',
            en: 'Just smile and say, "Thank you, Grandma!"',
            vi: 'Chỉ mỉm cười và nói: "Cháu cảm ơn bà!"',
            v: 'ok',
            why: {
              en: 'Saying thank you is polite. But Grandma asked a question — the honest answer is that {friend} helped.',
              vi: 'Cảm ơn bà là lễ phép. Nhưng bà đang hỏi con — câu trả lời trung thực là bạn {friend} đã giúp.'
            }
          }
        ],
        lesson: {
          en: 'Honest people share the praise. When someone helps you, say so — it makes them happy too!',
          vi: 'Người trung thực biết chia sẻ lời khen. Ai giúp mình thì hãy nói ra — bạn ấy cũng sẽ vui lắm!'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ sharing & turns
  {
    id: 'life.sharing',
    world: 'kind',
    icon: '🤲',
    title: 'Sharing & taking turns',
    vi: 'Chia sẻ và chờ đến lượt',
    goal: 'Con biết chia sẻ đồ chơi, đồ ăn, chờ đến lượt và tìm cách chia sao cho công bằng.',
    talk: [
      'Món đồ chơi nào con thấy dễ chia sẻ, món nào con thấy khó? Vì sao?',
      'Khi hai bạn cùng muốn một món đồ, có những cách công bằng nào để chọn?',
      'Trước khi chia đồ ăn cho bạn, vì sao mình nên hỏi người lớn trước?'
    ],
    scenarios: [
      {
        id: 'sharing-swing',
        tier: 1,
        value: 'respect',
        scene: '🌳🧒⏳',
        pic: { bg: 'playground', cast: [{ e: '🧒', you: true, up: 15, think: '😄' }, { e: '🧒', think: '⏳' }] },
        q: {
          en: 'You have been on the swing for a long time. {friend} has been waiting for a turn. What do you do?',
          vi: 'Con đã chơi xích đu khá lâu rồi. Bạn {friend} đang đứng chờ đến lượt. Con làm gì?'
        },
        choices: [
          {
            e: '🙅',
            en: 'Keep swinging — you got there first',
            vi: 'Cứ đu tiếp — mình đến trước mà',
            v: 'no',
            why: {
              en: "Getting there first doesn't mean keeping it all day. {friend} would be waiting and waiting.",
              vi: 'Đến trước không có nghĩa là được chơi cả ngày. Bạn {friend} sẽ phải chờ mãi.'
            }
          },
          {
            e: '🔢',
            en: 'Say, "Ten more swings!" and then really get off',
            vi: 'Nói: "Cho tớ đu thêm 10 cái nữa nhé!" rồi xuống thật',
            v: 'ok',
            why: {
              en: "Counting down is fair if you really stop. But you've had a long turn already, so letting {friend} go now is kinder.",
              vi: 'Đếm rồi xuống cũng công bằng, nếu con dừng thật. Nhưng con đã chơi lâu rồi, nhường bạn {friend} ngay thì tử tế hơn.'
            }
          },
          {
            e: '🔄',
            en: 'Slow down, get off, and let {friend} have a turn',
            vi: 'Đu chậm lại, xuống và nhường bạn {friend} chơi',
            v: 'best',
            why: {
              en: "That's fair and kind. Now {friend} gets a go, and you can have another turn later.",
              vi: 'Như vậy vừa công bằng vừa tử tế. Giờ bạn {friend} được chơi, lát nữa con lại có lượt.'
            }
          }
        ],
        lesson: {
          en: "Take turns: when you've had a good go, let someone else have a turn too.",
          vi: 'Chơi theo lượt: khi con đã chơi đủ, hãy nhường bạn khác nhé.'
        }
      },
      {
        id: 'sharing-crayons',
        tier: 1,
        value: 'care',
        scene: '🖍️✏️🙂',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true }, { e: '🧒', think: '🖍️' }], props: ['🖍️', '✏️'] },
        q: {
          en: '{friend} comes over to draw with you. {friend} only has a pencil. You have a big box of crayons. What do you do?',
          vi: 'Bạn {friend} sang nhà vẽ tranh cùng con. Bạn chỉ có một cây bút chì, còn con có cả một hộp bút sáp màu. Con làm gì?'
        },
        choices: [
          {
            e: '✋',
            en: 'Hold the box close and say, "These are mine!"',
            vi: 'Ôm chặt hộp bút và nói: "Của tớ!"',
            v: 'no',
            why: {
              en: 'They are yours — but {friend} is your guest, and would feel left out with just a pencil.',
              vi: 'Bút là của con thật — nhưng bạn {friend} là khách, chỉ có bút chì thì bạn sẽ thấy lẻ loi lắm.'
            }
          },
          {
            e: '🖍️',
            en: 'Put the crayons in the middle so you can both use them',
            vi: 'Đặt hộp bút sáp ở giữa để hai bạn cùng dùng',
            v: 'best',
            why: {
              en: 'Now you can both make colourful pictures. Sharing makes playing together more fun.',
              vi: 'Giờ cả hai cùng vẽ được tranh nhiều màu. Chia sẻ thì chơi cùng nhau vui hơn.'
            }
          },
          {
            e: '✏️',
            en: 'Give {friend} only the broken crayons',
            vi: 'Chỉ đưa cho bạn {friend} mấy cây bút sáp bị gãy',
            v: 'no',
            why: {
              en: "That isn't really sharing. Think how you'd feel with only the broken ones.",
              vi: 'Như vậy chưa thật sự là chia sẻ. Thử nghĩ xem, nếu con chỉ được mấy cây gãy thì con thấy thế nào?'
            }
          }
        ],
        lesson: {
          en: "Sharing means letting others use the good things too — just as you'd like them to share with you.",
          vi: 'Chia sẻ là để bạn cùng dùng đồ tốt, giống như con cũng muốn bạn chia sẻ với mình.'
        }
      },
      {
        id: 'sharing-ball',
        tier: 2,
        value: 'harmony',
        scene: '⚽✊✊',
        pic: {
          bg: 'playground',
          cast: [
            { e: '🧒', you: true, say: { en: 'I had it first!', vi: 'Tớ lấy trước!' } },
            { e: '⚽', size: 's' },
            { e: '🧒', flip: true, say: { en: 'No, I did!', vi: 'Không, tớ trước!' } }
          ]
        },
        q: {
          en: 'You and {friend} grab the same ball at the playground. You both pull and shout, "I had it first!" What do you do?',
          vi: 'Con và bạn {friend} cùng chộp một quả bóng ở sân chơi. Cả hai cùng kéo và hét: "Tớ lấy trước!" Con làm gì?'
        },
        choices: [
          {
            e: '💪',
            en: 'Pull harder until {friend} lets go — you had it first!',
            vi: 'Kéo thật mạnh đến khi bạn {friend} buông ra — mình lấy trước mà!',
            v: 'no',
            why: {
              en: 'Pulling can end with someone falling over or getting hurt — and then nobody has fun.',
              vi: 'Giằng co có thể làm ai đó ngã hoặc bị đau — rồi chẳng ai vui cả.'
            }
          },
          {
            e: '✌️',
            en: 'Let go and say, "Scissors-paper-stone for first turn?"',
            vi: 'Buông tay và nói: "Oẳn tù tì xem ai chơi trước nhé?"',
            v: 'best',
            why: {
              en: 'A fair game decides it, and nobody gets hurt. Then you can take turns — or play with the ball together.',
              vi: 'Để một trò công bằng quyết định thì không ai bị đau. Sau đó thay phiên nhau — hoặc cùng chơi chung.'
            }
          },
          {
            e: '🚶',
            en: 'Let go and walk off to find something else',
            vi: 'Buông tay rồi bỏ đi tìm trò khác',
            v: 'ok',
            why: {
              en: 'Letting go stops the pulling. But you wanted to play too — a fair way means you both get a turn.',
              vi: 'Buông tay là hết giằng co. Nhưng con cũng muốn chơi mà — tìm cách công bằng thì cả hai đều có lượt.'
            }
          }
        ],
        lesson: {
          en: 'Both want the same thing? Stop pulling and find a fair way: take turns, play together, or scissors-paper-stone.',
          vi: 'Cùng muốn một món? Đừng giành giật — hãy tìm cách công bằng: thay phiên, chơi chung, hoặc oẳn tù tì.'
        }
      },
      {
        id: 'sharing-cake',
        tier: 2,
        value: 'care',
        scene: '🍰🧒🧒',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '🍰' }, { e: '🍰', size: 's' }, { e: '🧒', flip: true, think: '🍰' }] },
        q: {
          en: 'There is one piece of cake left. You and {friend} both want it. What do you do?',
          vi: 'Chỉ còn một miếng bánh. Con và bạn {friend} đều muốn ăn. Con làm gì?'
        },
        choices: [
          {
            e: '🏃',
            en: 'Grab it quickly before {friend} can',
            vi: 'Chộp lấy thật nhanh trước khi bạn {friend} kịp lấy',
            v: 'no',
            why: {
              en: 'Then {friend} gets nothing and may feel upset. Grabbing turns a treat into a quarrel.',
              vi: 'Như vậy bạn {friend} chẳng được gì và sẽ buồn. Giành giật thì món ngon lại thành chuyện cãi nhau.'
            }
          },
          {
            e: '🎁',
            en: 'Let {friend} have the whole piece',
            vi: 'Nhường cả miếng cho bạn {friend}',
            v: 'ok',
            why: {
              en: "That's very generous! Sharing it half and half is fair too — then you both get to enjoy it.",
              vi: 'Con thật hào phóng! Chia đôi cũng công bằng — như vậy cả hai cùng được thưởng thức.'
            }
          },
          {
            e: '🍰',
            en: 'Ask a grown-up to cut it in half, so you each get some',
            vi: 'Nhờ người lớn cắt đôi để mỗi bạn một nửa',
            v: 'best',
            why: {
              en: 'Half each means you both get a treat and nobody feels left out.',
              vi: 'Mỗi bạn một nửa thì ai cũng được ăn và không ai thấy thiệt.'
            }
          }
        ],
        lesson: {
          en: "When there's only one, share it fairly so everyone can enjoy it.",
          vi: 'Khi chỉ còn một phần, hãy chia công bằng để ai cũng được vui.'
        }
      },
      {
        id: 'sharing-toycar',
        tier: 2,
        value: 'care',
        scene: '🚗🧒⏲️',
        pic: {
          bg: 'home',
          cast: [
            { e: '🧒', you: true, think: '😟' },
            { e: '🚗', size: 's' },
            { e: '🧒', say: { en: 'Can I have a go?', vi: 'Cho tớ chơi với!' } }
          ]
        },
        q: {
          en: "{friend} is at your home and wants a turn with your new toy car. You've only played with it a little. What do you do?",
          vi: 'Bạn {friend} sang nhà chơi và muốn thử chiếc ô tô đồ chơi mới của con. Con mới chơi được một chút. Con làm gì?'
        },
        choices: [
          {
            e: '👀',
            en: 'Show {friend} how it works, but keep holding it yourself',
            vi: 'Chỉ cho bạn {friend} cách chơi, nhưng mình vẫn cầm',
            v: 'ok',
            why: {
              en: 'Showing is a nice start! But {friend} wants to try too. Taking turns lets you both have fun.',
              vi: 'Chỉ cho bạn là khởi đầu hay! Nhưng bạn {friend} cũng muốn thử. Thay phiên thì cả hai cùng vui.'
            }
          },
          {
            e: '⏲️',
            en: 'Take turns — ask a grown-up to set a timer',
            vi: 'Thay phiên nhau — nhờ người lớn hẹn giờ',
            v: 'best',
            why: {
              en: 'A timer makes turns fair, so you both get to enjoy the new car.',
              vi: 'Hẹn giờ giúp chia lượt công bằng, để cả hai cùng được chơi xe mới.'
            }
          },
          {
            e: '🙈',
            en: "Hide the car and say you don't have one",
            vi: 'Giấu xe đi và nói là không có',
            v: 'no',
            why: {
              en: "That's a fib, and {friend} would miss out. Sharing is easier than hiding.",
              vi: 'Như vậy là nói dối, mà bạn {friend} lại không được chơi. Chia sẻ còn dễ hơn là giấu.'
            }
          }
        ],
        lesson: {
          en: 'Sharing a new toy can feel hard. Taking turns with a timer makes it fair for everyone.',
          vi: 'Chia sẻ đồ chơi mới có thể hơi khó. Thay phiên theo giờ sẽ công bằng cho mọi người.'
        }
      },
      {
        id: 'sharing-snack',
        tier: 3,
        value: 'care',
        scene: '🍪🤔🙋',
        pic: {
          bg: 'playground',
          cast: [{ e: '🧒', you: true, think: '🤔' }, { e: '🧒', say: { en: 'Can I have one?', vi: 'Cho tớ một cái nhé?' } }],
          props: ['🍪']
        },
        q: {
          en: 'You have a packet of biscuits at the playground. {friend} asks, "Can I have one?" What do you do?',
          vi: 'Ở sân chơi, con có một gói bánh quy. Bạn {friend} hỏi: "Cho tớ một cái nhé?" Con làm gì?'
        },
        choices: [
          {
            e: '🍪',
            en: 'Give {friend} one right away — sharing is caring!',
            vi: 'Đưa ngay cho bạn {friend} một cái — chia sẻ là tốt mà!',
            v: 'ok',
            why: {
              en: "Sharing is kind! But some children can't eat certain foods. Checking with a grown-up first is even better.",
              vi: 'Chia sẻ là tử tế! Nhưng có bạn không ăn được một số món. Hỏi người lớn trước thì còn tốt hơn.'
            }
          },
          {
            e: '🙋',
            en: 'Check with a grown-up first, then share with {friend}',
            vi: 'Hỏi người lớn trước, rồi mới chia cho bạn {friend}',
            v: 'best',
            why: {
              en: 'Some children get very sick from foods like nuts or eggs. A quick check keeps {friend} safe — kind and careful!',
              vi: 'Có bạn ăn phải các loại hạt hay trứng là bị ốm nặng. Hỏi nhanh một câu là bạn {friend} được an toàn — vừa tử tế vừa cẩn thận!'
            }
          },
          {
            e: '🙅',
            en: 'Say "No" and quickly eat them all',
            vi: 'Nói "Không" rồi ăn thật nhanh cho hết',
            v: 'no',
            why: {
              en: "You don't always have to share food. But gobbling it all up so fast might leave {friend} feeling sad.",
              vi: 'Không phải lúc nào cũng phải chia đồ ăn. Nhưng ăn vội cho hết thì bạn {friend} sẽ buồn đấy.'
            }
          }
        ],
        lesson: {
          en: 'Sharing food is kind — just check with a grown-up first, because some friends have allergies.',
          vi: 'Chia đồ ăn là tử tế — nhưng hãy hỏi người lớn trước, vì có bạn bị dị ứng.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ a kind friend
  {
    id: 'life.kind-friend',
    world: 'kind',
    icon: '🤗',
    title: 'Being a kind friend',
    vi: 'Làm người bạn tử tế',
    goal: 'Con biết rủ bạn đang lẻ loi cùng chơi, hỏi han khi bạn bị đau, không trêu chọc và dám lên tiếng khi bạn bị trêu.',
    talk: [
      'Có bao giờ con thấy một bạn đứng chơi một mình không? Con nghĩ bạn ấy cảm thấy thế nào?',
      'Nếu có bạn bị trêu, con có thể nói câu gì để giúp bạn?',
      'Đùa thế nào thì cả hai cùng vui, đùa thế nào thì làm bạn buồn?'
    ],
    scenarios: [
      {
        id: 'kindfriend-alone',
        tier: 1,
        value: 'care',
        scene: '🧒⚽👀',
        pic: { bg: 'playground', cast: [{ e: '🧒', you: true }, { e: '🧒' }, { e: '🧒', x: 88, think: '😔' }] },
        q: {
          en: "You and some friends are playing catching at the playground. A child you don't know is watching from the side, all alone. What do you do?",
          vi: 'Con và các bạn đang chơi đuổi bắt ở sân chơi. Có một bạn con không quen đứng một mình bên cạnh nhìn. Con làm gì?'
        },
        choices: [
          {
            e: '🤭',
            en: 'Whisper and giggle with your friends while looking at the child',
            vi: 'Thì thầm, cười khúc khích với các bạn và nhìn về phía bạn ấy',
            v: 'no',
            why: {
              en: "The child might think you're laughing at them and feel even more alone.",
              vi: 'Bạn ấy có thể nghĩ các con đang cười mình và càng thấy lẻ loi hơn.'
            }
          },
          {
            e: '👋',
            en: 'Smile and ask, "Do you want to play with us?"',
            vi: 'Mỉm cười và hỏi: "Bạn có muốn chơi cùng không?"',
            v: 'best',
            why: {
              en: "One small question can make someone's whole day. You might even make a new friend.",
              vi: 'Một câu rủ nhỏ thôi cũng có thể làm bạn ấy vui cả ngày. Biết đâu con có thêm bạn mới.'
            }
          },
          {
            e: '🏃',
            en: 'Keep playing — the child can ask to join if they want',
            vi: 'Cứ chơi tiếp — bạn ấy muốn thì tự xin vào',
            v: 'ok',
            why: {
              en: "That isn't unkind. But asking to join can feel scary when you're new. You can make it easier by asking first.",
              vi: 'Như vậy không có gì xấu. Nhưng với bạn mới, mở lời rất khó. Con rủ trước sẽ giúp bạn dễ hơn.'
            }
          }
        ],
        lesson: {
          en: 'See someone on their own? A smile and "Want to play?" can make a new friend.',
          vi: 'Thấy ai đó đứng một mình? Một nụ cười và câu "Chơi cùng không?" có thể mang lại một người bạn mới.'
        }
      },
      {
        id: 'kindfriend-fall',
        tier: 1,
        value: 'care',
        scene: '🏃💥😢',
        pic: { bg: 'playground', cast: [{ e: '🧒', you: true, think: '😮' }, { e: '🧒', think: '😢' }, { e: '🏃', flip: true, x: 88 }] },
        q: {
          en: '{friend} trips while running and starts to cry. The other children keep playing. What do you do?',
          vi: 'Bạn {friend} vấp ngã khi đang chạy và bắt đầu khóc. Các bạn khác vẫn chơi tiếp. Con làm gì?'
        },
        choices: [
          {
            e: '⚽',
            en: 'Keep playing like everyone else',
            vi: 'Chơi tiếp như các bạn khác',
            v: 'no',
            why: {
              en: '{friend} might feel that nobody cares. You can be the one who helps.',
              vi: 'Bạn {friend} có thể nghĩ chẳng ai quan tâm mình. Con có thể là người giúp bạn.'
            }
          },
          {
            e: '😆',
            en: 'Laugh — it looked funny',
            vi: 'Cười — trông buồn cười quá',
            v: 'no',
            why: {
              en: 'Falling hurts, and it can feel embarrassing too. Laughing would make {friend} feel worse.',
              vi: 'Ngã thì đau, lại còn ngượng nữa. Cười bạn sẽ làm bạn {friend} buồn hơn.'
            }
          },
          {
            e: '🤗',
            en: 'Go over and ask, "Are you OK?"',
            vi: 'Chạy lại hỏi: "Bạn có sao không?"',
            v: 'best',
            why: {
              en: 'A kind friend nearby helps {friend} feel better. If {friend} is hurt, get a grown-up to check.',
              vi: 'Có bạn ở bên giúp bạn {friend} thấy đỡ hơn. Nếu bạn {friend} bị đau, hãy gọi người lớn đến xem.'
            }
          }
        ],
        lesson: {
          en: 'When someone gets hurt, stop and ask "Are you OK?" — and get a grown-up if needed.',
          vi: 'Khi có bạn bị đau, hãy dừng lại hỏi "Bạn có sao không?" — và gọi người lớn nếu cần.'
        }
      },
      {
        id: 'kindfriend-nickname',
        tier: 1,
        value: 'respect',
        scene: '👓😆🤐',
        pic: { bg: 'playground', cast: [{ e: '🧒', you: true, think: '💭😆' }, { e: '🧒' }], props: ['👓'] },
        q: {
          en: '{name} has new glasses. You think of a funny name to tease {name} about them. Other kids would laugh. What do you do?',
          vi: 'Bạn {name} vừa đeo kính mới. Con nghĩ ra một biệt danh buồn cười để trêu bạn vì cặp kính. Các bạn khác chắc sẽ cười. Con làm gì?'
        },
        choices: [
          {
            e: '📣',
            en: "Say it out loud — it's just a joke!",
            vi: 'Nói to lên — đùa thôi mà!',
            v: 'no',
            why: {
              en: '{name} might feel hurt and not want to wear the glasses any more. Words about how someone looks can sting for a long time.',
              vi: 'Bạn {name} có thể buồn và không muốn đeo kính nữa. Lời trêu về ngoại hình có thể làm người ta buồn rất lâu.'
            }
          },
          {
            e: '🤐',
            en: "Keep it to yourself, and just use {name}'s real name",
            vi: 'Không nói ra, và gọi bạn {name} bằng tên thật',
            v: 'best',
            why: {
              en: "A joke is only funny if everyone laughs — including the person it's about.",
              vi: 'Câu đùa chỉ vui khi tất cả cùng cười — kể cả người bị đem ra đùa.'
            }
          },
          {
            e: '🤫',
            en: 'Whisper it to {friend} only',
            vi: 'Chỉ thì thầm cho bạn {friend} nghe thôi',
            v: 'no',
            why: {
              en: 'Whispers travel fast. {name} could still find out and feel hurt.',
              vi: 'Lời thì thầm lan đi nhanh lắm. Bạn {name} vẫn có thể biết và buồn.'
            }
          }
        ],
        lesson: {
          en: 'Use kind words about how others look. If a joke could hurt someone, keep it to yourself.',
          vi: 'Hãy nói về vẻ ngoài của người khác bằng lời tử tế. Câu đùa nào có thể làm bạn buồn thì đừng nói.'
        }
      },
      {
        id: 'kindfriend-teased',
        tier: 2,
        value: 'care',
        scene: '😢🗣️🛡️',
        pic: {
          bg: 'playground',
          cast: [
            { e: '🧒', you: true, think: '😟' },
            { e: '🧒', think: '😢' },
            { e: '🧒', flip: true, say: { en: 'Slowpoke! Slowpoke!', vi: 'Rùa bò! Rùa bò!' } }
          ]
        },
        q: {
          en: 'Some children laugh at {friend} and call {friend} "Slowpoke" for running slowly. {friend} looks sad. What do you do?',
          vi: 'Mấy bạn cười bạn {friend} và gọi là "Rùa bò" vì bạn chạy chậm. Bạn {friend} trông rất buồn. Con làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Go and tell a grown-up',
            vi: 'Đi báo người lớn',
            v: 'ok',
            why: {
              en: 'Grown-ups can help stop teasing! Even better: say "Stop" and stay with {friend} too, so your friend isn\'t alone.',
              vi: 'Người lớn có thể giúp ngăn việc trêu chọc! Còn tốt hơn nữa nếu con nói "Thôi đi" và ở bên bạn {friend}, để bạn không lẻ loi.'
            }
          },
          {
            e: '😆',
            en: "Laugh along with them, so they don't tease you as well",
            vi: 'Cười theo các bạn, để các bạn không quay sang trêu mình',
            v: 'no',
            why: {
              en: 'Laughing along makes {friend} feel even more alone. Friends stick together.',
              vi: 'Cười theo sẽ làm bạn {friend} thấy cô đơn hơn. Bạn bè thì phải đứng về phía nhau.'
            }
          },
          {
            e: '🛡️',
            en: 'Stand by {friend} and say, "Stop. That\'s unkind."',
            vi: 'Đứng cạnh bạn {friend} và nói: "Thôi đi, thế là không hay."',
            v: 'best',
            why: {
              en: "Teasing hurts less when a friend stands with you. If it doesn't stop, get a grown-up too.",
              vi: 'Có bạn đứng bên thì bị trêu đỡ buồn hơn nhiều. Nếu các bạn không dừng, hãy báo người lớn nữa.'
            }
          }
        ],
        lesson: {
          en: 'If someone is being teased, don\'t just watch: stand with them, say "Stop", and tell a grown-up.',
          vi: 'Khi có bạn bị trêu, đừng chỉ đứng nhìn: hãy ở bên bạn, nói "Thôi đi" và báo người lớn.'
        }
      },
      {
        id: 'kindfriend-join',
        tier: 2,
        value: 'harmony',
        scene: '🛒🧒❓',
        pic: {
          bg: 'playground',
          cast: [{ e: '🧒', you: true }, { e: '🧒' }, { e: '🧒', x: 88, say: { en: 'Can I play too?', vi: 'Cho tớ chơi với!' } }],
          props: ['🛒', '🍎']
        },
        q: {
          en: 'You and {friend} are playing a pretend shop game. {name} comes over and asks, "Can I play too?" What do you say?',
          vi: 'Con và bạn {friend} đang chơi trò bán hàng. Bạn {name} đi tới và hỏi: "Cho tớ chơi với!" Con nói gì?'
        },
        choices: [
          {
            e: '🙅',
            en: '"No. Only two people can play."',
            vi: '"Không được. Trò này chỉ hai người chơi thôi."',
            v: 'no',
            why: {
              en: "Most pretend games can stretch to fit one more. Being left out feels sad — think how you'd feel.",
              vi: 'Hầu hết trò đóng vai đều thêm được người. Bị cho ra rìa buồn lắm — thử nghĩ nếu là con thì sao.'
            }
          },
          {
            e: '⏳',
            en: '"You can play in the next game."',
            vi: '"Ván sau bạn chơi cùng nhé."',
            v: 'ok',
            why: {
              en: "That's fair if you really let {name} join next time. But {name} would have to wait alone — finding a part now is kinder.",
              vi: 'Vậy cũng công bằng, nếu ván sau con cho bạn {name} chơi thật. Nhưng bạn sẽ phải đứng chờ một mình — tìm vai ngay thì tử tế hơn.'
            }
          },
          {
            e: '🛒',
            en: '"Yes! You can be our customer!"',
            vi: '"Được chứ! Bạn làm khách mua hàng nhé!"',
            v: 'best',
            why: {
              en: 'You found a part for {name} — and a shop with more customers is more fun!',
              vi: 'Con đã tìm được vai cho bạn {name} — mà cửa hàng có thêm khách thì càng vui!'
            }
          }
        ],
        lesson: {
          en: 'When someone asks to join, look for a way to say yes. There is usually room for one more.',
          vi: 'Khi có bạn xin chơi cùng, hãy tìm cách đồng ý. Thường thì luôn có chỗ cho thêm một người.'
        }
      },
      {
        id: 'kindfriend-choose',
        tier: 3,
        value: 'integrity',
        scene: '🗣️🤔💛',
        pic: {
          bg: 'playground',
          cast: [
            { e: '🧒', x: 15, think: '😔' },
            { e: '🧒', you: true, think: '🤔' },
            { e: '🧒', flip: true, say: { en: "Don't play with them!", vi: 'Đừng chơi với bạn ấy!' } }
          ]
        },
        q: {
          en: '{friend} says, "Don\'t play with {name}, or I won\'t be your friend!" You like playing with both of them. What do you do?',
          vi: 'Bạn {friend} nói: "Cậu mà chơi với {name} thì tớ không chơi với cậu nữa!" Con thích chơi với cả hai bạn. Con làm gì?'
        },
        choices: [
          {
            e: '🚶',
            en: 'Stop playing with {name}, so {friend} stays your friend',
            vi: 'Thôi chơi với {name} để {friend} vẫn chơi với mình',
            v: 'no',
            why: {
              en: "{name} hasn't done anything wrong and would feel very left out. Real friends don't make rules like that.",
              vi: 'Bạn {name} có làm gì sai đâu, mà sẽ thấy bị bỏ rơi lắm. Bạn thật sự không đặt ra điều kiện như vậy.'
            }
          },
          {
            e: '🤫',
            en: "Play with {name} only when {friend} isn't looking",
            vi: 'Chỉ chơi với {name} lúc {friend} không để ý',
            v: 'ok',
            why: {
              en: "You didn't leave {name} out. But there's no need to hide — you can be honest and kind at the same time.",
              vi: 'Con không bỏ rơi bạn {name}. Nhưng không cần lén lút đâu — con có thể vừa thật lòng vừa tử tế.'
            }
          },
          {
            e: '💛',
            en: '"I want to be friends with you both. Let\'s all play!"',
            vi: '"Tớ muốn chơi với cả hai bạn. Mình cùng chơi nhé!"',
            v: 'best',
            why: {
              en: "That's brave and fair. {friend} may be grumpy for a bit, but leaving {name} out isn't the answer.",
              vi: 'Như vậy là dũng cảm và công bằng. Bạn {friend} có thể dỗi một lúc, nhưng gạt bạn {name} ra không phải là cách.'
            }
          },
          {
            e: '😠',
            en: '"Then I don\'t want to be YOUR friend!"',
            vi: '"Thế thì tớ cũng không chơi với cậu nữa!"',
            v: 'no',
            why: {
              en: 'Being mean back starts a bigger quarrel. You can say no to the rule and still be kind to {friend}.',
              vi: 'Đáp trả gay gắt chỉ làm hai bạn cãi to hơn. Con có thể từ chối điều kiện đó mà vẫn tử tế với bạn {friend}.'
            }
          }
        ],
        lesson: {
          en: 'Nobody should make you leave someone out. You can be a kind friend to more than one person.',
          vi: 'Không ai được bắt con gạt bạn khác ra. Con có thể là bạn tốt của nhiều người cùng lúc.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ sorry & making it right
  {
    id: 'life.sorry',
    world: 'kind',
    icon: '🩹',
    title: 'Sorry & making it right',
    vi: 'Biết xin lỗi và sửa sai',
    goal: 'Con biết xin lỗi thật lòng, tự sửa lại điều mình làm sai, và biết tha thứ khi bạn xin lỗi mình.',
    talk: [
      'Lời xin lỗi "thật lòng" khác lời xin lỗi "cho xong" ở chỗ nào?',
      'Ngoài nói xin lỗi, con có thể làm gì để sửa sai?',
      'Khi bạn đã xin lỗi mà con vẫn còn buồn, con có thể nói gì?'
    ],
    scenarios: [
      {
        id: 'sorry-milk',
        tier: 1,
        value: 'responsibility',
        scene: '🥛💦👵',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '😮' }, { e: '👵', size: 'l', x: 85 }], props: ['🥛', '💦'] },
        q: {
          en: "At Grandma's house, you knock over your glass of milk. It spills all over the floor. What do you do?",
          vi: 'Ở nhà bà, con làm đổ cốc sữa. Sữa tràn hết ra sàn. Con làm gì?'
        },
        choices: [
          {
            e: '🗣️',
            en: 'Say, "Sorry, Grandma!" and go back to playing',
            vi: 'Nói "Cháu xin lỗi bà!" rồi quay lại chơi',
            v: 'ok',
            why: {
              en: 'Saying sorry is a good start! But then Grandma has to clean it all alone. Helping is how you make it right.',
              vi: 'Xin lỗi là khởi đầu tốt! Nhưng như vậy bà phải dọn một mình. Phụ bà một tay mới là sửa sai.'
            }
          },
          {
            e: '🧽',
            en: 'Tell Grandma, say sorry, and help wipe it up with a cloth',
            vi: 'Báo bà, xin lỗi bà và lấy khăn lau giúp',
            v: 'best',
            why: {
              en: "Saying sorry is good — helping clean up is even better. That's making it right.",
              vi: 'Xin lỗi là tốt — cùng dọn dẹp thì còn tốt hơn. Đó là cách sửa sai.'
            }
          },
          {
            e: '🙈',
            en: 'Walk away and hope nobody notices',
            vi: 'Bỏ đi và mong không ai để ý',
            v: 'no',
            why: {
              en: 'Someone could slip on the wet floor and fall. Telling quickly keeps everyone safe.',
              vi: 'Sàn ướt có thể làm ai đó trượt ngã. Báo ngay thì mọi người mới an toàn.'
            }
          }
        ],
        lesson: {
          en: "Made a mess? Say sorry, then help fix it. That's how you make things right.",
          vi: 'Lỡ bày bừa? Xin lỗi, rồi giúp dọn dẹp. Đó là cách con sửa sai.'
        }
      },
      {
        id: 'sorry-mean-name',
        tier: 1,
        value: 'respect',
        scene: '😠💬😢',
        pic: { bg: 'playground', cast: [{ e: '🧒', you: true, think: '😳' }, { e: '🧒', think: '😢' }], props: ['🎲'] },
        q: {
          en: 'During a game, you got cross and called {friend} a mean name. Now {friend} looks sad. What do you do?',
          vi: 'Đang chơi, con bực mình và gọi bạn {friend} bằng một cái tên khó nghe. Giờ bạn {friend} trông rất buồn. Con làm gì?'
        },
        choices: [
          {
            e: '😏',
            en: 'Say, "It was just a joke!"',
            vi: 'Nói: "Tớ đùa thôi mà!"',
            v: 'no',
            why: {
              en: "If {friend} is sad, it didn't feel like a joke. A sorry is better than an excuse.",
              vi: 'Bạn {friend} buồn thì đó đâu phải là đùa. Xin lỗi thì tốt hơn là chống chế.'
            }
          },
          {
            e: '💛',
            en: 'Say, "I\'m sorry I called you that. It was unkind."',
            vi: 'Nói: "Tớ xin lỗi vì đã gọi cậu như thế. Như vậy là không hay."',
            v: 'best',
            why: {
              en: "That's a real sorry: you said what you did and that it was wrong. It helps {friend} feel better.",
              vi: 'Đó là lời xin lỗi thật lòng: con nói rõ việc mình làm và nhận là chưa đúng. Bạn {friend} sẽ thấy đỡ buồn.'
            }
          },
          {
            e: '⏳',
            en: 'Say nothing — {friend} will forget',
            vi: 'Không nói gì — rồi bạn {friend} sẽ quên',
            v: 'no',
            why: {
              en: 'Unkind words can stay with someone for a long time. A sorry helps the hurt go away.',
              vi: 'Lời nói khó nghe có thể làm người ta buồn rất lâu. Một lời xin lỗi giúp nỗi buồn qua đi.'
            }
          }
        ],
        lesson: {
          en: 'Said something unkind? Say sorry and say what you did: "I\'m sorry I called you that."',
          vi: 'Lỡ nói lời khó nghe? Hãy xin lỗi và nói rõ việc mình làm: "Tớ xin lỗi vì đã gọi cậu như thế."'
        }
      },
      {
        id: 'sorry-robot',
        tier: 2,
        value: 'integrity',
        scene: '🤖💔😟',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '😟' }, { e: '🤖', size: 's' }], props: ['💥'] },
        q: {
          en: "You are playing with {friend}'s toy robot. Oops — one arm snaps off! {friend} is in the other room. What do you do?",
          vi: 'Con đang chơi con rô-bốt của bạn {friend}. Ối — một cánh tay bị gãy rời! Bạn {friend} đang ở phòng bên. Con làm gì?'
        },
        choices: [
          {
            e: '🤫',
            en: 'Push the arm back on and put the robot down quietly',
            vi: 'Gắn tạm cánh tay vào rồi lặng lẽ đặt rô-bốt xuống',
            v: 'no',
            why: {
              en: 'The arm would fall off again later, and {friend} might think it was their own fault.',
              vi: 'Cánh tay sẽ lại rơi ra, và bạn {friend} có thể tưởng là tại mình.'
            }
          },
          {
            e: '🙄',
            en: 'Say, "It was already broken."',
            vi: 'Nói: "Nó bị hỏng sẵn rồi mà."',
            v: 'no',
            why: {
              en: "That isn't true. If {friend} finds out, it may be hard to trust you again.",
              vi: 'Như vậy là không đúng sự thật. Nếu bạn {friend} biết được, bạn sẽ khó tin con lần nữa.'
            }
          },
          {
            e: '🙋',
            en: 'Tell {friend} right away and say sorry',
            vi: 'Nói ngay với bạn {friend} và xin lỗi',
            v: 'best',
            why: {
              en: '{friend} may feel sad, but will trust you more for being honest — and maybe a grown-up can fix it.',
              vi: 'Bạn {friend} có thể buồn, nhưng sẽ tin con hơn vì con trung thực — và biết đâu người lớn sửa lại được.'
            }
          }
        ],
        lesson: {
          en: "Broke something that isn't yours? Tell the owner, say sorry, and help fix or replace it.",
          vi: 'Lỡ làm hỏng đồ của người khác? Hãy nói với bạn, xin lỗi và giúp sửa hoặc đền lại.'
        }
      },
      {
        id: 'sorry-real',
        tier: 2,
        value: 'respect',
        scene: '🙄🗣️❓',
        pic: { bg: 'playground', cast: [{ e: '🧒', you: true, say: { en: 'Sorry…', vi: 'Xin lỗi…' } }, { e: '🧒', think: '😠' }] },
        q: {
          en: 'You grabbed {friend}\'s spade in the sandpit. You mumbled "Sorry" and looked away. {friend} still looks upset. What now?',
          vi: 'Con giật cái xẻng của bạn {friend} ở hố cát. Con lí nhí "xin lỗi" rồi nhìn đi chỗ khác. Bạn {friend} vẫn còn buồn. Giờ con làm gì?'
        },
        choices: [
          {
            e: '📢',
            en: 'Shout "SORRY!" really loudly',
            vi: 'Hét thật to: "XIN LỖI!"',
            v: 'no',
            why: {
              en: "Loud isn't the same as kind. Shouting can sound like you're still cross.",
              vi: 'To tiếng không có nghĩa là thật lòng. Hét lên nghe như con vẫn còn đang bực.'
            }
          },
          {
            e: '👀',
            en: 'Give back the spade and say a real sorry',
            vi: 'Trả lại xẻng và xin lỗi bạn thật lòng',
            v: 'best',
            why: {
              en: 'A real sorry means looking at the person, using a kind voice, and fixing what you did.',
              vi: 'Xin lỗi thật lòng là nhìn vào bạn, nói bằng giọng tử tế và sửa lại việc mình đã làm.'
            }
          },
          {
            e: '🙄',
            en: 'Say, "I already said sorry! Why are you still cross?"',
            vi: 'Nói: "Tớ xin lỗi rồi còn gì! Sao cậu còn giận?"',
            v: 'no',
            why: {
              en: "The word was there, but the feeling wasn't — and you still have the spade. {friend} can tell.",
              vi: 'Con đã nói lời xin lỗi, nhưng chưa thật lòng — mà con vẫn đang cầm xẻng của bạn. Bạn {friend} cảm nhận được.'
            }
          }
        ],
        lesson: {
          en: 'A real sorry: look at the person, say what you did, use a kind voice, and make it right.',
          vi: 'Xin lỗi thật lòng: nhìn vào bạn, nói rõ việc mình làm, giọng tử tế, và sửa sai.'
        }
      },
      {
        id: 'sorry-forgive',
        tier: 3,
        value: 'harmony',
        scene: '🏖️💥🤝',
        pic: {
          bg: 'beach',
          cast: [{ e: '🧒', you: true, think: '😞' }, { e: '🧒', say: { en: "I'm really sorry!", vi: 'Tớ xin lỗi cậu nhiều!' } }],
          props: ['💥']
        },
        q: {
          en: '{friend} knocks down your sandcastle by accident and says, "I\'m really sorry!" You still feel upset. What do you say?',
          vi: 'Bạn {friend} vô tình làm đổ lâu đài cát của con và nói: "Tớ xin lỗi cậu nhiều!" Con vẫn còn buồn. Con nói gì?'
        },
        choices: [
          {
            e: '😊',
            en: 'Smile and say, "It\'s OK!" even though you still feel upset',
            vi: 'Cười và nói "Không sao đâu!" dù trong lòng vẫn buồn',
            v: 'ok',
            why: {
              en: 'That\'s kind to {friend}! But your feelings matter too. It\'s fine to say "Thanks for saying sorry" and take a moment.',
              vi: 'Con tử tế với bạn {friend} lắm! Nhưng cảm xúc của con cũng quan trọng. Con có thể nói "Cảm ơn cậu đã xin lỗi" rồi nghỉ một chút.'
            }
          },
          {
            e: '🏰',
            en: "Knock down {friend}'s castle too, so it's fair",
            vi: 'Đạp đổ lâu đài của bạn {friend} cho công bằng',
            v: 'no',
            why: {
              en: "That would be on purpose, and {friend}'s was an accident. Then you'd both be sad.",
              vi: 'Như vậy là con cố ý, còn bạn {friend} thì chỉ vô tình. Rồi cả hai cùng buồn.'
            }
          },
          {
            e: '🤝',
            en: '"Thanks for saying sorry. I need a minute — then let\'s build again!"',
            vi: '"Cảm ơn cậu đã xin lỗi. Cho tớ một lúc nhé, rồi mình cùng xây lại!"',
            v: 'best',
            why: {
              en: 'You were honest about your feelings and still kind. Building together might make an even better castle.',
              vi: 'Con nói thật cảm xúc của mình mà vẫn tử tế. Cùng nhau xây lại, biết đâu lâu đài còn đẹp hơn.'
            }
          },
          {
            e: '🙅',
            en: '"I\'ll never play with you again!"',
            vi: '"Tớ sẽ không bao giờ chơi với cậu nữa!"',
            v: 'no',
            why: {
              en: '{friend} said sorry for an accident. Staying cross for ever could lose you a friend.',
              vi: 'Bạn {friend} đã xin lỗi về một chuyện vô tình. Giận mãi thì con sẽ mất một người bạn.'
            }
          }
        ],
        lesson: {
          en: 'When someone says sorry, say "Thanks for saying sorry." It\'s OK to need a little time to feel better.',
          vi: 'Khi bạn xin lỗi, hãy nói "Cảm ơn cậu đã xin lỗi." Cần chút thời gian cho hết buồn cũng không sao.'
        }
      },
      {
        id: 'sorry-both',
        tier: 3,
        value: 'integrity',
        scene: '📖💔🤝',
        pic: {
          bg: 'home',
          cast: [
            { e: '🧒', you: true, think: '😮' },
            { e: '📖', size: 's' },
            { e: '🧒', flip: true, say: { en: "It's your fault!", vi: 'Tại cậu đấy!' } }
          ]
        },
        q: {
          en: 'You and {friend} both pull the same book, and a page rips. {friend} says, "It\'s your fault!" What do you do?',
          vi: 'Con và bạn {friend} cùng giằng một quyển sách, và một trang bị rách. Bạn {friend} nói: "Tại cậu đấy!" Con làm gì?'
        },
        choices: [
          {
            e: '😤',
            en: 'Say, "No, it\'s YOUR fault!"',
            vi: 'Nói: "Không, tại cậu thì có!"',
            v: 'no',
            why: {
              en: "Arguing about whose fault it is won't fix the page. It just makes you both crosser.",
              vi: 'Cãi nhau xem lỗi của ai không làm trang sách lành lại, chỉ làm hai bạn bực hơn.'
            }
          },
          {
            e: '⏳',
            en: 'Wait for {friend} to say sorry first — {friend} pulled too!',
            vi: 'Chờ bạn {friend} xin lỗi trước — bạn {friend} cũng giằng mà!',
            v: 'ok',
            why: {
              en: "Waiting can turn into a long sulk. Saying sorry first for your part is brave — it isn't losing.",
              vi: 'Chờ nhau thì dễ thành giận dỗi lâu. Xin lỗi trước về phần mình là dũng cảm, không phải là thua.'
            }
          },
          {
            e: '🤝',
            en: 'Say sorry for your part, and fix it together',
            vi: 'Xin lỗi về phần mình, rồi cùng nhau dán lại',
            v: 'best',
            why: {
              en: 'You both pulled, so you can both fix it — a grown-up can find some tape. Someone has to go first; it can be you.',
              vi: 'Cả hai cùng giằng thì cùng sửa — nhờ người lớn lấy băng dính nhé. Phải có người xin lỗi trước, người đó có thể là con.'
            }
          }
        ],
        lesson: {
          en: "When it's partly your fault, say sorry for your part and fix it together.",
          vi: 'Khi mình cũng có lỗi, hãy xin lỗi về phần mình và cùng nhau sửa.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ manners, elders, gratitude
  {
    id: 'life.polite',
    world: 'kind',
    icon: '🙏',
    title: 'Please, thank you & elders',
    vi: 'Lễ phép và biết ơn',
    goal: 'Con biết chào hỏi, dạ thưa và mời ông bà, bố mẹ; nói lời nhờ và lời cảm ơn; đón nhận quà và món ăn một cách lễ phép.',
    talk: [
      'Khi đến nhà ông bà, con chào thế nào cho ông bà vui?',
      'Trước bữa cơm, nhà mình có mời nhau ăn không? Con thử mời cả nhà xem nào.',
      'Nếu được tặng một món quà con không thích lắm, con có thể nói gì vừa thật lòng vừa tử tế?'
    ],
    scenarios: [
      {
        id: 'polite-greet',
        tier: 1,
        value: 'respect',
        scene: '👵👴👋',
        pic: { bg: 'door', cast: [{ e: '🧒', you: true }, { e: '👵', size: 'l' }, { e: '👴', size: 'l' }] },
        q: {
          en: "You arrive at Grandma and Grandpa's home. They open the door, smiling. What do you do first?",
          vi: 'Con đến nhà ông bà. Ông bà ra mở cửa, cười tươi. Việc đầu tiên con làm là gì?'
        },
        choices: [
          {
            e: '👋',
            en: 'Greet them: "Hello, Grandma! Hello, Grandpa!"',
            vi: 'Khoanh tay chào: "Cháu chào ông, cháu chào bà ạ!"',
            v: 'best',
            why: {
              en: 'A warm hello shows Grandma and Grandpa how happy you are to see them.',
              vi: 'Lời chào lễ phép cho ông bà biết con rất vui được gặp ông bà.'
            }
          },
          {
            e: '🙈',
            en: 'Feel shy and hide behind Mummy',
            vi: 'Thấy ngại nên trốn sau lưng mẹ',
            v: 'ok',
            why: {
              en: 'Feeling shy is OK! Try a small wave or a quiet hello — Grandma and Grandpa will love it.',
              vi: 'Ngại cũng không sao! Con thử vẫy tay hoặc chào nhỏ thôi — ông bà sẽ vui lắm.'
            }
          },
          {
            e: '📺',
            en: 'Run straight past them to the TV',
            vi: 'Chạy thẳng vào xem TV',
            v: 'no',
            why: {
              en: 'Grandma and Grandpa were waiting to see you! They might feel a little sad if you rush past.',
              vi: 'Ông bà đang mong gặp con lắm! Con chạy vụt qua thì ông bà sẽ hơi buồn.'
            }
          }
        ],
        lesson: {
          en: 'Greet the grown-ups when you arrive. A hello and a smile make people feel loved.',
          vi: 'Đến nơi thì chào người lớn trước. Một lời chào và nụ cười làm mọi người thấy ấm lòng.'
        }
      },
      {
        id: 'polite-rice',
        tier: 1,
        value: 'respect',
        scene: '🍚🙏😋',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '🍚' }, { e: '👨', size: 'l' }], props: ['🍚', '🥢'] },
        q: {
          en: 'At dinner, you want more rice. The rice pot is next to Daddy. What do you say?',
          vi: 'Trong bữa cơm, con muốn ăn thêm cơm. Nồi cơm ở cạnh bố. Con nói gì?'
        },
        choices: [
          {
            e: '📢',
            en: '"More rice! Now!"',
            vi: '"Thêm cơm! Nhanh lên!"',
            v: 'no',
            why: {
              en: 'That sounds bossy. Daddy will still help, but asking nicely makes everyone feel good.',
              vi: 'Nghe như ra lệnh vậy. Bố vẫn sẽ giúp, nhưng nhờ một cách lễ phép thì ai cũng vui.'
            }
          },
          {
            e: '🖐️',
            en: 'Stand up and reach across the table to grab it',
            vi: 'Đứng lên với tay qua bàn để tự lấy',
            v: 'no',
            why: {
              en: 'Reaching over the dishes can knock things over. Asking is safer and more polite.',
              vi: 'Với tay qua bàn dễ làm đổ đồ. Nhờ người khác lấy giúp thì an toàn và lịch sự hơn.'
            }
          },
          {
            e: '🙏',
            en: '"Daddy, can I have some more rice, please?"',
            vi: '"Bố ơi, bố xới thêm cơm cho con với ạ."',
            v: 'best',
            why: {
              en: '"Please" makes asking kind and polite. Don\'t forget "thank you" when you get it!',
              vi: 'Nhờ ai cũng nói nhẹ nhàng, có "ạ" cho lễ phép. Nhận rồi thì nhớ cảm ơn nhé!'
            }
          }
        ],
        lesson: {
          en: 'Asking for something? Say "please" — and "thank you" when you get it.',
          vi: 'Muốn nhờ ai điều gì, hãy nói lễ phép — và nhớ cảm ơn khi được giúp.'
        }
      },
      {
        id: 'polite-answer',
        tier: 1,
        value: 'respect',
        scene: '👵📣🧸',
        pic: {
          bg: 'home',
          cast: [{ e: '🧒', you: true }, { e: '👵', size: 'l', x: 88, say: { en: 'Sweetie, come here!', vi: 'Cháu ơi, lại đây!' } }],
          props: ['🧸', '🧱']
        },
        q: {
          en: 'You are playing with your toys. Grandma calls you from the kitchen. What do you do?',
          vi: 'Con đang chơi đồ chơi. Bà gọi con từ trong bếp. Con làm gì?'
        },
        choices: [
          {
            e: '🙉',
            en: "Pretend you didn't hear and keep playing",
            vi: 'Giả vờ không nghe thấy và chơi tiếp',
            v: 'no',
            why: {
              en: "Grandma might need help, or start to worry. Pretending not to hear isn't kind or honest.",
              vi: 'Bà có thể đang cần con giúp, hoặc sẽ lo. Giả vờ không nghe thì vừa không ngoan vừa không thật thà.'
            }
          },
          {
            e: '🙋',
            en: 'Answer, "Yes, Grandma!" and go to see what she needs',
            vi: 'Trả lời: "Dạ, cháu đây ạ!" rồi chạy vào xem bà cần gì',
            v: 'best',
            why: {
              en: "Answering right away is respectful — and Grandma doesn't have to call again and again.",
              vi: 'Dạ ngay khi được gọi là lễ phép — bà không phải gọi đi gọi lại.'
            }
          },
          {
            e: '📢',
            en: 'Shout "WHAT?" from where you are',
            vi: 'Hét vọng ra: "Gì thế?"',
            v: 'ok',
            why: {
              en: 'At least you answered! But "Yes, Grandma?" and going to her is more polite than shouting.',
              vi: 'Ít ra con đã trả lời! Nhưng "Dạ, bà gọi cháu ạ?" rồi đi tới chỗ bà thì lễ phép hơn hét vọng ra.'
            }
          }
        ],
        lesson: {
          en: 'When an elder calls you, answer politely and go to them: "Yes, Grandma!"',
          vi: 'Khi người lớn gọi, hãy dạ thưa lễ phép và đến gần: "Dạ, cháu đây ạ!"'
        }
      },
      {
        id: 'polite-meal',
        tier: 2,
        value: 'respect',
        scene: '🍲🥢👴',
        pic: {
          bg: 'home',
          cast: [{ e: '👴', size: 'l' }, { e: '👵', size: 'l' }, { e: '🧒', you: true, think: '😋' }],
          props: ['🍲', '🍚', '🥢']
        },
        q: {
          en: "Dinner is on the table. Grandpa, Grandma, Mummy and Daddy sit down. You're very hungry! What do you do before you eat?",
          vi: 'Cơm đã dọn lên bàn. Ông bà, bố mẹ đã ngồi vào chỗ. Con đói lắm rồi! Trước khi ăn, con làm gì?'
        },
        choices: [
          {
            e: '🍗',
            en: 'Pick out the best pieces of chicken for yourself first',
            vi: 'Gắp ngay những miếng gà ngon nhất cho mình',
            v: 'no',
            why: {
              en: 'The best pieces are lovely to offer to Grandpa and Grandma first. Taking them all leaves others with less.',
              vi: 'Miếng ngon thì nên mời ông bà trước. Con gắp hết thì người khác sẽ thiệt.'
            }
          },
          {
            e: '🙏',
            en: 'Invite everyone: "Grandpa, Grandma, Mummy, Daddy — please eat!"',
            vi: 'Mời cả nhà: "Cháu mời ông bà ăn cơm, con mời bố mẹ ăn cơm ạ!"',
            v: 'best',
            why: {
              en: 'Inviting the elders to eat first shows respect and love. Then you can tuck in!',
              vi: 'Mời ông bà, bố mẹ trước là thể hiện kính trọng và yêu thương. Rồi con ăn thật ngon miệng nhé!'
            }
          },
          {
            e: '🍚',
            en: "Start eating right away — you're starving!",
            vi: 'Ăn ngay — con đói quá rồi!',
            v: 'no',
            why: {
              en: 'Being hungry is normal! But waiting a moment to invite the elders is a lovely family habit.',
              vi: 'Đói là chuyện bình thường! Nhưng chờ một chút để mời ông bà, bố mẹ là nếp nhà rất đẹp.'
            }
          }
        ],
        lesson: {
          en: "Before eating, invite the elders to eat first. It's a small way to show respect and love.",
          vi: 'Trước khi ăn, hãy mời ông bà, bố mẹ. Đó là cách nhỏ để thể hiện lễ phép và yêu thương.'
        }
      },
      {
        id: 'polite-phone',
        tier: 2,
        value: 'respect',
        scene: '👩📱✋',
        pic: {
          bg: 'home',
          cast: [{ e: '🧒', you: true, think: '🧱👀' }, { e: '👩', size: 'l', say: { en: 'Hello? Yes, I can talk…', vi: 'A lô? Vâng, tôi nghe…' } }],
          props: ['🧱', '📱']
        },
        q: {
          en: "Mummy is talking on the phone. You want to show her the tower you built. It isn't an emergency. What do you do?",
          vi: 'Mẹ đang nói chuyện điện thoại. Con muốn khoe mẹ cái tháp con vừa xếp. Không có gì gấp cả. Con làm gì?'
        },
        choices: [
          {
            e: '📢',
            en: 'Pull Mummy\'s arm and shout, "Mummy! Mummy! Look!"',
            vi: 'Kéo tay mẹ và gọi to: "Mẹ ơi! Mẹ ơi! Nhìn này!"',
            v: 'no',
            why: {
              en: "Mummy can't hear her call when you shout. Waiting a moment is more polite.",
              vi: 'Con gọi to thì mẹ không nghe được điện thoại. Chờ một chút sẽ lịch sự hơn.'
            }
          },
          {
            e: '✋',
            en: "Put a gentle hand on Mummy's arm and wait",
            vi: 'Nhẹ nhàng đặt tay lên tay mẹ và chờ',
            v: 'best',
            why: {
              en: 'Mummy knows you need her, and can finish the call first. If someone is hurt, though, tell her straight away.',
              vi: 'Mẹ biết con cần mẹ và sẽ nói nốt cuộc gọi. Còn nếu có ai bị đau thì con báo mẹ ngay nhé.'
            }
          },
          {
            e: '📱',
            en: 'Take the phone and say, "Bye-bye!"',
            vi: 'Giật điện thoại và nói: "Bai bai!"',
            v: 'no',
            why: {
              en: "The person on the phone may be saying something important. Taking the phone isn't fair to Mummy or to them.",
              vi: 'Người ở đầu dây có thể đang nói chuyện quan trọng. Giật điện thoại là không tôn trọng mẹ và cả người đó.'
            }
          }
        ],
        lesson: {
          en: 'Need someone who is talking? Put a gentle hand on their arm and wait. Only interrupt for emergencies.',
          vi: 'Cần người lớn khi họ đang nói chuyện? Nhẹ nhàng đặt tay lên tay họ và chờ. Chỉ ngắt lời khi có chuyện khẩn cấp.'
        }
      },
      {
        id: 'polite-soup',
        tier: 2,
        value: 'respect',
        scene: '👵🍲😕',
        pic: {
          bg: 'home',
          cast: [{ e: '🧒', you: true, think: '😖' }, { e: '👵', size: 'l', say: { en: 'I made it just for you!', vi: 'Bà nấu riêng cho cháu đấy!' } }],
          props: ['🍲', '🥄']
        },
        q: {
          en: "Grandma cooked a special soup for you. You taste it and don't like it. What do you do?",
          vi: 'Bà nấu một nồi canh đặc biệt cho con. Con nếm thử và thấy không thích. Con làm gì?'
        },
        choices: [
          {
            e: '🙏',
            en: 'Put down your spoon and say politely, "No more, thank you, Grandma."',
            vi: 'Đặt thìa xuống và lễ phép nói: "Cháu không ăn nữa ạ, cháu cảm ơn bà."',
            v: 'ok',
            why: {
              en: "That's polite! But trying a little more is even better — new tastes get easier, and Grandma will be so pleased you tried.",
              vi: 'Như vậy là lễ phép! Nhưng thử thêm vài thìa thì còn tốt hơn — vị mới ăn dần sẽ quen, mà bà cũng vui lắm.'
            }
          },
          {
            e: '🤢',
            en: 'Say "Yuck!" and push the bowl away',
            vi: 'Kêu "Eo ơi!" và đẩy bát ra',
            v: 'no',
            why: {
              en: 'Grandma worked hard to cook it. "Yuck" can hurt feelings — "No, thank you" is kinder.',
              vi: 'Bà đã vất vả nấu nướng. Kêu "Eo ơi" sẽ làm bà buồn — từ chối nhẹ nhàng thì tử tế hơn.'
            }
          },
          {
            e: '🥄',
            en: 'Try a little more and say, "Thank you, Grandma!"',
            vi: 'Ăn thử thêm vài thìa và nói: "Cháu cảm ơn bà ạ!"',
            v: 'best',
            why: {
              en: "Grandma knows you tried and that you're thankful. New tastes often get nicer each time you try them.",
              vi: 'Bà biết con đã cố gắng và biết ơn bà. Món mới thường càng ăn càng thấy quen và ngon hơn.'
            }
          }
        ],
        lesson: {
          en: 'When someone cooks for you, say thank you — and give new tastes a try.',
          vi: 'Khi ai đó nấu cho mình ăn, hãy cảm ơn — và thử nếm món mới nhé.'
        }
      },
      {
        id: 'polite-gift',
        tier: 3,
        value: 'respect',
        scene: '🎁🧦🤔',
        pic: {
          bg: 'party',
          cast: [{ e: '🧒', you: true, think: '🧸❓' }, { e: '👩', size: 'l', say: { en: 'Do you like it?', vi: 'Cháu có thích không?' } }],
          props: ['🧦', '🎁']
        },
        q: {
          en: 'Auntie gives you a birthday present. You open it — socks! You were hoping for a toy. Auntie asks, "Do you like it?" What do you say?',
          vi: 'Cô tặng quà sinh nhật cho con. Con mở ra — một đôi tất! Con đã mong là đồ chơi cơ. Cô hỏi: "Cháu có thích không?" Con nói gì?'
        },
        choices: [
          {
            e: '😒',
            en: '"Socks? I wanted a toy."',
            vi: '"Tất à? Cháu muốn đồ chơi cơ."',
            v: 'no',
            why: {
              en: 'Auntie chose the gift for you and might feel hurt. A present is about the kind thought behind it.',
              vi: 'Cô đã chọn quà cho con và có thể sẽ buồn. Món quà quý ở tấm lòng của người tặng.'
            }
          },
          {
            e: '🤩',
            en: '"I love it! It\'s the best present I\'ve ever had!"',
            vi: '"Cháu thích lắm! Quà tuyệt nhất cháu từng có ạ!"',
            v: 'ok',
            why: {
              en: "You want Auntie to feel happy — kind! But it isn't quite true. You can be kind AND honest by thanking Auntie for thinking of you.",
              vi: 'Con muốn cô vui — thật tử tế! Nhưng như vậy chưa đúng sự thật. Con có thể vừa tử tế vừa trung thực bằng cách cảm ơn cô đã nghĩ đến con.'
            }
          },
          {
            e: '🙏',
            en: '"Thank you, Auntie, for thinking of me!"',
            vi: '"Cháu cảm ơn cô đã nhớ đến cháu ạ!"',
            v: 'best',
            why: {
              en: "Kind and true. You may not love socks, but you really are thankful that Auntie remembered you.",
              vi: 'Vừa tử tế vừa thật lòng. Có thể con không mê đôi tất, nhưng con thật sự vui vì cô đã nhớ đến con.'
            }
          }
        ],
        lesson: {
          en: "Got a gift you don't love? Thank the person for thinking of you. That's kind and true.",
          vi: 'Được tặng món quà không thích lắm? Hãy cảm ơn người tặng vì đã nghĩ đến con — vừa tử tế vừa thật lòng.'
        }
      }
    ]
  }
];
