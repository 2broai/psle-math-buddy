// World: feelings — see README.md in this folder for the format.
// Rule for this world: every feeling is OK; we only guide what we DO with it.
export const TOPICS = [
  // ------------------------------------------------------------------ naming feelings
  {
    id: 'life.feel-names',
    world: 'feelings',
    icon: '🎭',
    title: 'Name my feelings',
    vi: 'Gọi tên cảm xúc',
    goal: 'Con nhận ra cảm xúc qua nét mặt, cơ thể và tình huống, và gọi được đúng tên của chúng.',
    talk: [
      'Hôm nay con thấy vui nhất lúc nào? Buồn hay bực nhất lúc nào?',
      'Khi con tức giận, cơ thể con thấy thế nào: mặt nóng, tay nắm chặt, tim đập nhanh?',
      'Có khi nào con thấy hai cảm xúc cùng lúc không, ví dụ vừa vui vừa buồn?'
    ],
    scenarios: [
      {
        id: 'feel-names-excited',
        tier: 1,
        scene: '🎂🧒🎉',
        pic: {
          bg: 'party',
          cast: [
            { e: '🧒', you: true },
            { e: '🧒', flip: true, up: 12, say: { en: "It's my birthday party!", vi: 'Hôm nay sinh nhật tớ!' } }
          ],
          props: ['🎂', '🎁']
        },
        q: {
          en: "It's {friend}'s birthday party today. {friend} is jumping up and down with a big smile. How does {friend} feel?",
          vi: 'Hôm nay là tiệc sinh nhật của {friend}. {friend} nhảy cẫng lên, cười thật tươi. {friend} đang cảm thấy thế nào?'
        },
        choices: [
          {
            e: '🤩',
            en: 'Excited and happy',
            vi: 'Háo hức và vui',
            v: 'best',
            why: {
              en: 'Jumping and a big smile are clues that someone feels excited and happy.',
              vi: 'Nhảy cẫng lên và cười thật tươi là dấu hiệu bạn đang háo hức và vui.'
            }
          },
          {
            e: '😢',
            en: 'Sad',
            vi: 'Buồn',
            v: 'no',
            why: {
              en: 'When we feel sad, we often look down or cry. {friend} is smiling and jumping — those are happy clues!',
              vi: 'Khi buồn, mình hay cúi mặt hoặc khóc. {friend} đang cười và nhảy — đó là dấu hiệu của niềm vui!'
            }
          },
          {
            e: '🥱',
            en: 'Bored',
            vi: 'Chán',
            v: 'no',
            why: {
              en: 'Bored people sit still and sigh. {friend} can’t stop jumping, so this feeling is much brighter!',
              vi: 'Khi chán, người ta hay ngồi im và thở dài. {friend} nhảy không ngừng, nên đây là một cảm xúc vui hơn nhiều!'
            }
          }
        ],
        lesson: {
          en: 'Faces and bodies give us clues. A big smile and bouncing feet often mean excited!',
          vi: 'Nét mặt và cơ thể cho mình biết cảm xúc. Cười tươi và nhảy cẫng thường là đang háo hức!'
        }
      },
      {
        id: 'feel-names-sad',
        tier: 1,
        scene: '🎈☁️🧒',
        pic: {
          bg: 'park',
          cast: [
            { e: '🧒', you: true, x: 25 },
            { e: '🧒', flip: true, x: 60, think: '🎈' }
          ],
          props: [{ e: '🎈', x: 80, y: 12 }]
        },
        q: {
          en: "{name}'s red balloon slips away and floats up into the sky. {name}'s eyes fill with tears. How does {name} feel?",
          vi: 'Quả bóng bay màu đỏ của {name} tuột tay, bay mất lên trời. Mắt {name} rưng rưng. {name} đang cảm thấy thế nào?'
        },
        choices: [
          {
            e: '😢',
            en: 'Sad',
            vi: 'Buồn',
            v: 'best',
            why: {
              en: 'Losing something we love can make us feel sad. Tears are a clue — and it’s OK to cry.',
              vi: 'Mất thứ mình thích có thể làm mình buồn. Nước mắt là dấu hiệu — và khóc cũng không sao cả.'
            }
          },
          {
            e: '😄',
            en: 'Happy',
            vi: 'Vui',
            v: 'no',
            why: {
              en: 'A balloon flying high can look fun, but {name} has tears, not a smile. That’s a sad clue.',
              vi: 'Bóng bay lên cao trông cũng vui, nhưng {name} đang rưng rưng nước mắt chứ không cười. Đó là dấu hiệu buồn.'
            }
          },
          {
            e: '🌟',
            en: 'Proud',
            vi: 'Tự hào',
            v: 'no',
            why: {
              en: 'Proud is the warm feeling after we do something well, like finishing a puzzle. Losing a balloon feels different.',
              vi: 'Tự hào là cảm giác ấm áp khi mình làm tốt một việc, như ghép xong tranh. Mất bóng bay thì khác hẳn.'
            }
          }
        ],
        lesson: {
          en: 'Tears often mean sad. A kind word or a hug can help a sad friend feel better.',
          vi: 'Nước mắt thường là buồn. Một lời an ủi hay một cái ôm giúp bạn đang buồn thấy dễ chịu hơn.'
        }
      },
      {
        id: 'feel-names-proud',
        tier: 1,
        scene: '🚲🧒⭐',
        pic: {
          bg: 'park',
          cast: [
            { e: '🚴', you: true, x: 38 },
            { e: '👨', size: 'l', flip: true, x: 78, say: { en: 'You did it by yourself!', vi: 'Con tự đạp được rồi!' } }
          ]
        },
        q: {
          en: 'You practised riding your bike every day. Today you ride all by yourself! You feel warm and tall inside. What is that feeling?',
          vi: 'Ngày nào con cũng tập đi xe đạp. Hôm nay con tự đạp được một mình! Trong lòng con thấy ấm áp, như cao lớn hẳn lên. Đó là cảm xúc gì?'
        },
        choices: [
          {
            e: '🌟',
            en: 'Proud',
            vi: 'Tự hào',
            v: 'best',
            why: {
              en: 'Proud is the warm feeling we get when our hard work pays off. Well done!',
              vi: 'Tự hào là cảm giác ấm áp khi mình cố gắng và làm được. Giỏi lắm!'
            }
          },
          {
            e: '😳',
            en: 'Embarrassed',
            vi: 'Ngượng',
            v: 'no',
            why: {
              en: 'Embarrassed is when we want to hide, like after a little accident. You want to show everyone — that’s proud!',
              vi: 'Ngượng là khi mình muốn trốn đi, như sau một sự cố nhỏ. Còn con lại muốn khoe với mọi người — đó là tự hào!'
            }
          },
          {
            e: '😟',
            en: 'Worried',
            vi: 'Lo lắng',
            v: 'no',
            why: {
              en: 'Worried feels wobbly, like ‘what if…?’. Warm and tall inside sounds like proud.',
              vi: 'Lo lắng thì thấy chông chênh, cứ nghĩ ‘lỡ như…’. Thấy ấm áp và cao lớn trong lòng là tự hào đấy.'
            }
          }
        ],
        lesson: {
          en: 'Proud is the warm feeling after you keep trying. You can be proud of yourself!',
          vi: 'Tự hào là cảm giác ấm áp khi con kiên trì cố gắng. Con có thể tự hào về chính mình!'
        }
      },
      {
        id: 'feel-names-frustrated',
        tier: 2,
        scene: '🎒🤐😤',
        pic: {
          bg: 'classroom',
          cast: [
            { e: '🧒', you: true, x: 25 },
            { e: '🧒', flip: true, x: 62, say: { en: 'Argh! This zip!', vi: 'Aaa! Cái khoá này!' } }
          ],
          props: [{ e: '🎒', x: 72, y: 80 }]
        },
        q: {
          en: "{name} tries to close the school bag again and again, but the zip keeps getting stuck. {name} says, 'Argh!' What is {name} feeling?",
          vi: '{name} kéo khoá cặp hết lần này đến lần khác mà khoá cứ bị kẹt. {name} kêu lên: ‘Aaa!’. {name} đang cảm thấy gì?'
        },
        choices: [
          {
            e: '😤',
            en: 'Frustrated',
            vi: 'Bực bội',
            v: 'best',
            why: {
              en: 'Frustrated is the cross feeling we get when something is hard or won’t work. Everyone feels it sometimes.',
              vi: 'Bực bội là cảm giác khó chịu khi một việc khó quá hoặc làm mãi không được. Ai cũng có lúc như vậy.'
            }
          },
          {
            e: '😠',
            en: 'Angry',
            vi: 'Tức giận',
            v: 'ok',
            why: {
              en: 'It is a cross feeling! When we’re cross because something won’t work, there’s a special word for it: frustrated.',
              vi: 'Đó đúng là một kiểu khó chịu! Khi khó chịu vì làm mãi không được, mình có một từ riêng: bực bội.'
            }
          },
          {
            e: '😌',
            en: 'Calm',
            vi: 'Bình tĩnh',
            v: 'no',
            why: {
              en: 'Calm feels slow and easy. ‘Argh!’ is a clue that {name} feels the opposite of calm right now.',
              vi: 'Bình tĩnh là thấy thong thả, nhẹ nhàng. Tiếng ‘Aaa!’ cho thấy {name} đang không hề bình tĩnh.'
            }
          }
        ],
        lesson: {
          en: "When something won't work and you want to say 'Argh!', that's frustrated. Take a breath, then try again or ask for help.",
          vi: 'Khi làm mãi không được và muốn kêu ‘Aaa!’, đó là bực bội. Hít một hơi thật sâu, rồi thử lại hoặc nhờ giúp.'
        }
      },
      {
        id: 'feel-names-jealous',
        tier: 2,
        scene: '🧸✨🧒',
        pic: {
          bg: 'schoolyard',
          cast: [
            { e: '🧒', you: true, x: 28, think: '🧸' },
            { e: '🧒', flip: true, x: 68, say: { en: 'Look at my new toy!', vi: 'Xem đồ chơi mới của tớ nè!' } }
          ],
          props: [{ e: '🧸', x: 78, y: 74 }]
        },
        q: {
          en: '{friend} shows everyone a shiny new toy. You wish it was yours, and you get a grumpy, tight feeling inside. What is that feeling called?',
          vi: '{friend} khoe với mọi người một món đồ chơi mới tinh. Con ước gì nó là của con, và trong lòng thấy khó chịu, bứt rứt. Cảm xúc đó gọi là gì?'
        },
        choices: [
          {
            e: '😒',
            en: 'Jealous',
            vi: 'Ghen tị',
            v: 'best',
            why: {
              en: 'Jealous is wanting what someone else has. Everyone feels it sometimes. It’s OK — the feeling passes.',
              vi: 'Ghen tị là khi mình muốn có thứ người khác có. Ai cũng có lúc thấy vậy. Không sao cả — rồi cảm giác ấy sẽ qua.'
            }
          },
          {
            e: '🌟',
            en: 'Proud',
            vi: 'Tự hào',
            v: 'no',
            why: {
              en: 'Proud is a happy feeling about something you did. A grumpy feeling about someone else’s toy is jealous.',
              vi: 'Tự hào là cảm giác vui vì việc mình làm được. Khó chịu vì đồ chơi của người khác thì là ghen tị.'
            }
          },
          {
            e: '😨',
            en: 'Scared',
            vi: 'Sợ hãi',
            v: 'no',
            why: {
              en: 'Scared is when something might hurt or surprise us. Wishing the toy was yours is a different feeling: jealous.',
              vi: 'Sợ hãi là khi có gì đó làm mình giật mình hay có thể làm mình đau. Ước có món đồ của bạn là cảm xúc khác: ghen tị.'
            }
          }
        ],
        lesson: {
          en: "Feeling jealous is normal. Say 'Wow, nice toy!' — the grumpy feeling often gets smaller.",
          vi: 'Ghen tị là chuyện bình thường. Con thử khen: ‘Đồ chơi đẹp quá!’ — cảm giác khó chịu thường sẽ nhỏ lại.'
        }
      },
      {
        id: 'feel-names-embarrassed',
        tier: 2,
        scene: '🍱💥🧒',
        pic: {
          bg: 'classroom',
          cast: [
            { e: '👧', x: 15 },
            { e: '🧒', you: true, x: 45 },
            { e: '👦', flip: true, x: 82 }
          ],
          props: [
            { e: '🍱', x: 55, y: 84 },
            { e: '🍙', x: 63, y: 86 }
          ]
        },
        q: {
          en: 'You trip, and your lunch box falls open in front of the whole class. Your cheeks go hot and you want to hide. What feeling is that?',
          vi: 'Con vấp chân, hộp cơm rơi bung ra ngay trước cả lớp. Má con nóng bừng và con chỉ muốn trốn đi. Đó là cảm xúc gì?'
        },
        choices: [
          {
            e: '😳',
            en: 'Embarrassed',
            vi: 'Ngượng',
            v: 'best',
            why: {
              en: 'Hot cheeks and wanting to hide are clues for embarrassed. It happens to everyone, and it goes away soon.',
              vi: 'Má nóng bừng và muốn trốn đi là dấu hiệu của ngượng. Ai cũng từng bị vậy, và cảm giác này qua nhanh thôi.'
            }
          },
          {
            e: '🙈',
            en: 'Shy',
            vi: 'Rụt rè',
            v: 'ok',
            why: {
              en: 'Shy and embarrassed feel a lot alike. When a little accident happens and people see, we call it embarrassed.',
              vi: 'Rụt rè và ngượng khá giống nhau. Khi có sự cố nhỏ mà mọi người nhìn thấy, mình gọi là ngượng.'
            }
          },
          {
            e: '🤩',
            en: 'Excited',
            vi: 'Háo hức',
            v: 'no',
            why: {
              en: 'Excited feels bouncy and fun. Wanting to hide is a different clue — it means embarrassed.',
              vi: 'Háo hức là thấy rộn ràng, vui vẻ. Muốn trốn đi là dấu hiệu khác — đó là ngượng.'
            }
          }
        ],
        lesson: {
          en: "Embarrassed feels hot and wobbly, but it passes. Take a breath, pick things up and carry on — you're OK!",
          vi: 'Ngượng làm mình nóng mặt, nhưng rồi sẽ qua. Hít thở sâu, nhặt đồ lên và làm tiếp — con ổn mà!'
        }
      },
      {
        id: 'feel-names-mixed',
        tier: 3,
        scene: '👵🧳🧒',
        pic: {
          bg: 'door',
          cast: [
            { e: '🧒', you: true, x: 35 },
            { e: '👵', size: 'l', flip: true, x: 70, say: { en: 'Bye bye! I will miss you!', vi: 'Bà về nhé! Bà sẽ nhớ con!' } }
          ],
          props: [{ e: '🧳', x: 86, y: 80 }]
        },
        q: {
          en: 'Grandma stayed with you for a whole month, and now she is going home. You want to smile and cry at the same time. What is happening inside you?',
          vi: 'Bà ở chơi với nhà mình cả tháng, nay bà phải về rồi. Con vừa muốn cười lại vừa muốn khóc. Trong lòng con đang thế nào?'
        },
        choices: [
          {
            e: '💛',
            en: 'Two feelings at once: happy and sad',
            vi: 'Hai cảm xúc cùng lúc: vừa vui vừa buồn',
            v: 'best',
            why: {
              en: 'We can feel two feelings at the same time. Happy for the fun days, sad to say goodbye — both are OK.',
              vi: 'Mình có thể có hai cảm xúc cùng lúc. Vui vì những ngày bên bà, buồn vì phải chia tay — cả hai đều không sao.'
            }
          },
          {
            e: '😢',
            en: 'Only sad',
            vi: 'Chỉ có buồn thôi',
            v: 'ok',
            why: {
              en: 'Sad is a big part of it. Think about the fun you had together, too — there might be some happy in there as well.',
              vi: 'Buồn là một phần lớn. Nhưng nhớ lại những lúc vui bên bà — có lẽ trong lòng con cũng có cả niềm vui nữa.'
            }
          },
          {
            e: '🙂',
            en: "Only happy — big kids shouldn't feel sad",
            vi: 'Chỉ vui thôi — lớn rồi thì không được buồn',
            v: 'no',
            why: {
              en: 'Big kids and grown-ups feel sad too. Saying goodbye to someone we love is sad, and that’s OK.',
              vi: 'Các bạn lớn và cả người lớn cũng biết buồn. Chia tay người mình thương thì buồn là đương nhiên, không sao cả.'
            }
          }
        ],
        lesson: {
          en: "You can feel two feelings at once. Saying 'I feel happy and sad' helps others understand you.",
          vi: 'Con có thể có hai cảm xúc cùng lúc. Nói ra ‘Con vừa vui vừa buồn’ giúp mọi người hiểu con hơn.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ calming down
  {
    id: 'life.feel-calm',
    world: 'feelings',
    icon: '🌬️',
    title: 'Calm down when angry',
    vi: 'Bình tĩnh khi tức giận',
    goal: 'Con hiểu tức giận là cảm xúc bình thường, và biết tự làm dịu (hít thở, đếm, tránh ra chỗ khác, xin một cái ôm) thay vì đánh hay ném đồ.',
    talk: [
      'Khi con tức giận, cơ thể con báo hiệu thế nào?',
      'Cách nào giúp con bình tĩnh nhanh nhất: hít thở, đếm đến 10, ôm bố mẹ, hay ra chỗ yên tĩnh?',
      'Bố mẹ cũng có lúc tức giận. Bố mẹ thường làm gì để bình tĩnh lại?'
    ],
    scenarios: [
      {
        id: 'feel-calm-tower',
        tier: 1,
        scene: '🧱💥🧒',
        pic: {
          bg: 'home',
          cast: [
            { e: '🧒', you: true, x: 25, think: '💢' },
            { e: '🏃', flip: true, x: 75 }
          ],
          props: [
            { e: '🧱', x: 44, y: 82 },
            { e: '🧱', x: 51, y: 86 },
            { e: '💥', x: 48, y: 72 }
          ]
        },
        q: {
          en: 'You built a tall block tower. {friend} runs past and knocks it down by accident. You feel very angry! What can you do?',
          vi: 'Con xếp được một toà tháp gỗ thật cao. {friend} chạy ngang qua và vô tình làm đổ. Con thấy tức lắm! Con có thể làm gì?'
        },
        choices: [
          {
            e: '🌬️',
            en: 'Take three slow breaths, then tell {friend} how you feel',
            vi: 'Hít thở thật chậm ba lần, rồi nói cho {friend} biết con thấy thế nào',
            v: 'best',
            why: {
              en: 'It’s OK to feel angry. Slow breaths help the angry feeling shrink, and words help {friend} understand.',
              vi: 'Tức giận là chuyện bình thường. Hít thở chậm giúp cơn giận nhỏ lại, và lời nói giúp {friend} hiểu con.'
            }
          },
          {
            e: '👊',
            en: 'Hit {friend}',
            vi: 'Đánh {friend}',
            v: 'no',
            why: {
              en: 'It’s OK to feel angry, but hitting hurts. It was an accident, and then two people would be upset.',
              vi: 'Tức giận thì không sao, nhưng đánh bạn sẽ làm bạn đau. Bạn chỉ vô tình thôi, mà đánh nhau thì cả hai đều buồn.'
            }
          },
          {
            e: '🧱',
            en: "Knock down {friend}'s tower too",
            vi: 'Đẩy đổ tháp của {friend} cho bằng',
            v: 'no',
            why: {
              en: 'Getting even won’t bring your tower back — it just makes {friend} sad too. You could build it again, maybe together!',
              vi: 'Trả đũa không làm tháp của con đứng lại được, chỉ làm {friend} buồn thêm. Hay hai bạn cùng xây lại nhé!'
            }
          }
        ],
        lesson: {
          en: 'Angry is OK. Hitting is not. Breathe slowly, then use your words.',
          vi: 'Tức giận thì được. Đánh người thì không. Hít thở chậm, rồi nói bằng lời.'
        }
      },
      {
        id: 'feel-calm-bathtime',
        tier: 1,
        scene: '🛁⏰🧒',
        pic: {
          bg: 'home',
          cast: [
            { e: '🧒', you: true, x: 30 },
            { e: '👨', size: 'l', flip: true, x: 72, say: { en: 'Time for your bath!', vi: 'Đến giờ tắm rồi con!' } }
          ],
          props: ['🧸', '🚗']
        },
        q: {
          en: "You are having fun playing, and Daddy says, 'Time for your bath!' A big angry feeling comes. What can you do?",
          vi: 'Con đang chơi vui thì bố bảo: ‘Đến giờ tắm rồi con!’. Con thấy giận ơi là giận. Con có thể làm gì?'
        },
        choices: [
          {
            e: '🗣️',
            en: "Say 'I feel angry — I want to play more!', take a breath, then go",
            vi: 'Nói ‘Con đang giận vì con muốn chơi thêm!’, hít một hơi rồi đi tắm',
            v: 'best',
            why: {
              en: 'Saying how you feel is very grown-up. Daddy can understand you, and your toys will be there tomorrow.',
              vi: 'Biết nói ra cảm xúc của mình là con lớn rồi đấy. Bố sẽ hiểu con, và mai đồ chơi vẫn chờ con mà.'
            }
          },
          {
            e: '🧸',
            en: 'Throw your toys across the room',
            vi: 'Ném đồ chơi khắp phòng',
            v: 'no',
            why: {
              en: 'Your angry feeling is real, but thrown toys can break or hit someone. Squeezing a pillow is a safer way to let it out.',
              vi: 'Con giận thật, nhưng ném đồ chơi có thể làm vỡ đồ hoặc trúng người khác. Bóp thật chặt một cái gối thì an toàn hơn.'
            }
          },
          {
            e: '😫',
            en: 'Lie on the floor and scream',
            vi: 'Nằm lăn ra sàn và gào khóc',
            v: 'no',
            why: {
              en: 'Big feelings can make us want to scream. But Daddy can’t understand a scream. Words and a slow breath work better.',
              vi: 'Cảm xúc lớn có thể làm mình muốn hét lên. Nhưng bố khó hiểu con khi con gào khóc. Nói bằng lời và hít thở chậm sẽ tốt hơn.'
            }
          }
        ],
        lesson: {
          en: "When you're angry, say it in words: 'I feel angry because…'. Grown-ups can help when they understand.",
          vi: 'Khi giận, con hãy nói bằng lời: ‘Con giận vì…’. Người lớn sẽ giúp được khi hiểu con.'
        }
      },
      {
        id: 'feel-calm-scribble',
        tier: 2,
        scene: '🖍️🎨🧒',
        pic: {
          bg: 'home',
          cast: [
            { e: '🧒', you: true, x: 28, think: '💢' },
            { e: '👶', size: 's', flip: true, x: 62 }
          ],
          props: [
            { e: '🎨', x: 48, y: 80 },
            { e: '🖍️', x: 70, y: 84 }
          ]
        },
        q: {
          en: 'Your little cousin scribbles all over the drawing you worked hard on. Your fists get tight. What is a good first step?',
          vi: 'Em họ của con vẽ nguệch ngoạc lên bức tranh con đã vẽ rất công phu. Hai tay con nắm chặt. Việc đầu tiên con nên làm là gì?'
        },
        choices: [
          {
            e: '🔢',
            en: 'Stop, count slowly to 10, then tell a grown-up',
            vi: 'Dừng lại, đếm chậm đến 10, rồi nói với người lớn',
            v: 'best',
            why: {
              en: 'Counting gives your angry feeling time to cool down. Then a grown-up can help your cousin learn, and help with your drawing.',
              vi: 'Đếm chậm giúp cơn giận có thời gian nguội bớt. Rồi người lớn sẽ dạy em, và giúp con sửa lại bức tranh.'
            }
          },
          {
            e: '🚪',
            en: 'Walk away to your room to cool down',
            vi: 'Đi về phòng mình cho bình tĩnh lại',
            v: 'ok',
            why: {
              en: 'Walking away to cool down is smart! When you feel calmer, tell a grown-up too, so they can help.',
              vi: 'Tránh ra chỗ khác cho bình tĩnh là rất khôn! Khi đã dịu lại, con nhớ kể với người lớn để được giúp nhé.'
            }
          },
          {
            e: '✏️',
            en: "Scribble on your cousin's drawing too",
            vi: 'Vẽ bậy lại lên tranh của em',
            v: 'no',
            why: {
              en: 'Then two drawings are spoiled and two people are upset. Your cousin is little and still learning.',
              vi: 'Như vậy thì cả hai bức tranh đều hỏng và cả hai đều buồn. Em còn nhỏ nên chưa hiểu đâu.'
            }
          },
          {
            e: '🫸',
            en: 'Push your cousin away hard',
            vi: 'Đẩy mạnh em ra',
            v: 'no',
            why: {
              en: 'Of course you feel angry. But pushing can make your little cousin fall and get hurt. Keep your hands gentle, even when you’re cross.',
              vi: 'Con giận là đương nhiên. Nhưng đẩy mạnh có thể làm em ngã đau. Dù đang giận, tay mình vẫn phải nhẹ nhàng.'
            }
          }
        ],
        lesson: {
          en: 'Your calm-down tools: breathe slowly, count to 10, walk away, ask for a hug. Then tell a grown-up.',
          vi: 'Những cách giúp con bình tĩnh: hít thở chậm, đếm đến 10, tránh ra chỗ khác, xin một cái ôm. Rồi kể với người lớn.'
        }
      },
      {
        id: 'feel-calm-words',
        tier: 2,
        scene: '🍦🙅🧒',
        pic: {
          bg: 'supermarket',
          cast: [
            { e: '🧒', you: true, x: 32, think: '🍦' },
            { e: '👩', size: 'l', flip: true, x: 70, say: { en: 'No ice cream today.', vi: 'Hôm nay không ăn kem nhé.' } }
          ]
        },
        q: {
          en: "At the supermarket, Mummy says, 'No ice cream today.' You feel angry. Which words help Mummy understand you?",
          vi: 'Ở siêu thị, mẹ bảo: ‘Hôm nay không ăn kem nhé.’ Con thấy giận. Con nói câu nào để mẹ hiểu con?'
        },
        choices: [
          {
            e: '💬',
            en: "'I feel angry because I really wanted ice cream.'",
            vi: '‘Con đang giận vì con rất muốn ăn kem.’',
            v: 'best',
            why: {
              en: '‘I feel… because…’ tells Mummy exactly what’s going on. She may still say no, but she will understand you.',
              vi: 'Câu ‘Con thấy… vì…’ giúp mẹ hiểu rõ chuyện gì đang xảy ra. Mẹ có thể vẫn nói không, nhưng mẹ hiểu con.'
            }
          },
          {
            e: '😤',
            en: "'You're the meanest mummy ever!'",
            vi: '‘Mẹ là người xấu nhất!’',
            v: 'no',
            why: {
              en: 'Angry words can hurt Mummy’s feelings, even if you don’t mean them. Say what YOU feel instead.',
              vi: 'Lời nói lúc giận có thể làm mẹ buồn, dù con không cố ý. Thay vào đó, con hãy nói con đang thấy thế nào.'
            }
          },
          {
            e: '😶',
            en: 'Say nothing and sulk all day',
            vi: 'Không nói gì, giận dỗi cả ngày',
            v: 'no',
            why: {
              en: 'Keeping it inside can make the angry feeling last all day. Telling Mummy helps it go away faster.',
              vi: 'Giữ trong lòng có thể làm cơn giận kéo dài cả ngày. Nói với mẹ sẽ giúp nó qua nhanh hơn.'
            }
          }
        ],
        lesson: {
          en: "Try saying 'I feel angry because…'. Naming your feeling helps others understand — and helps you feel better.",
          vi: 'Con thử nói: ‘Con thấy giận vì…’. Gọi tên cảm xúc giúp người khác hiểu con — và giúp con dễ chịu hơn.'
        }
      },
      {
        id: 'feel-calm-body',
        tier: 2,
        scene: '🔥✊💓',
        pic: {
          bg: 'home',
          cast: [{ e: '🧒', you: true, think: '💢' }],
          props: ['💓', '✊']
        },
        q: {
          en: 'Your face feels hot, your hands make fists and your heart beats fast. These are signs of anger. What can you do first?',
          vi: 'Mặt con nóng bừng, tay nắm chặt, tim đập thình thịch. Đó là dấu hiệu cơn giận đang đến. Con làm gì trước tiên?'
        },
        choices: [
          {
            e: '🌸',
            en: 'Smell the flower, blow out the candle: breathe in slowly, breathe out slowly',
            vi: 'Ngửi bông hoa, thổi ngọn nến: hít vào thật chậm, thở ra thật chậm',
            v: 'best',
            why: {
              en: 'Slow breathing tells your body to calm down. Try it a few times — the hot feeling gets smaller.',
              vi: 'Hít thở chậm giúp cơ thể dịu lại. Thử vài lần nhé — cảm giác nóng bừng sẽ nhỏ dần.'
            }
          },
          {
            e: '📢',
            en: 'Shout at the person nearest to you',
            vi: 'Hét vào người đứng gần nhất',
            v: 'no',
            why: {
              en: 'Your anger is real, but shouting at someone can scare or hurt them. Calm your body first, then talk.',
              vi: 'Cơn giận của con là thật, nhưng hét vào người khác có thể làm họ sợ hoặc buồn. Làm dịu cơ thể trước, rồi hẵng nói.'
            }
          },
          {
            e: '🤐',
            en: "Pretend you're fine and squash it all inside",
            vi: 'Giả vờ như không sao và nén hết vào trong',
            v: 'no',
            why: {
              en: 'Feelings don’t disappear when we hide them. Breathing slowly, then talking about it, helps much more.',
              vi: 'Cảm xúc không biến mất khi mình giấu đi. Hít thở chậm rồi nói ra sẽ giúp con nhiều hơn.'
            }
          }
        ],
        lesson: {
          en: "Notice your body's anger signs early. Smell the flower, blow out the candle — and the anger gets smaller.",
          vi: 'Hãy để ý sớm dấu hiệu giận trong cơ thể. Ngửi bông hoa, thổi ngọn nến — cơn giận sẽ nhỏ lại.'
        }
      },
      {
        id: 'feel-calm-after',
        tier: 3,
        scene: '😌🧒🤗',
        value: 'care',
        pic: {
          bg: 'home',
          cast: [
            { e: '🧒', you: true, x: 30, think: '😌' },
            { e: '👩', size: 'l', flip: true, x: 70 }
          ]
        },
        q: {
          en: "You got very angry and shouted, 'I don't love you!' at Mummy. Now you feel calm again. What is the best thing to do?",
          vi: 'Lúc nãy con giận quá và hét lên với mẹ: ‘Con không thương mẹ nữa!’. Giờ con đã bình tĩnh lại. Con nên làm gì?'
        },
        choices: [
          {
            e: '🗣️',
            en: 'Say sorry for the hurtful words, and tell Mummy why you were upset',
            vi: 'Xin lỗi mẹ vì câu nói làm mẹ buồn, và kể cho mẹ vì sao con giận',
            v: 'best',
            why: {
              en: 'Being angry was OK, but those words hurt. Sorry helps fix the hurt, and talking helps Mummy understand you.',
              vi: 'Giận thì không sao, nhưng câu nói đó làm mẹ buồn. Lời xin lỗi giúp hàn gắn, và kể ra giúp mẹ hiểu con.'
            }
          },
          {
            e: '🤗',
            en: 'Give Mummy a hug without saying anything',
            vi: 'Ôm mẹ mà không nói gì',
            v: 'ok',
            why: {
              en: 'A hug is a lovely start. Saying sorry in words, and telling Mummy what upset you, makes it even better.',
              vi: 'Một cái ôm là khởi đầu rất đẹp. Nói lời xin lỗi và kể cho mẹ điều làm con giận thì còn tốt hơn nữa.'
            }
          },
          {
            e: '⏳',
            en: 'Wait for Mummy to say sorry first',
            vi: 'Chờ mẹ xin lỗi con trước',
            v: 'no',
            why: {
              en: 'Mummy may have had a good reason. When our words hurt someone, saying sorry ourselves is brave and kind.',
              vi: 'Có thể mẹ có lý do của mẹ. Khi lời nói của mình làm ai đó buồn, tự mình xin lỗi trước là dũng cảm và tử tế.'
            }
          }
        ],
        lesson: {
          en: 'After a big angry moment, say sorry for hurting words and talk it through. Mummy loves you, even when you are angry.',
          vi: 'Sau cơn giận, con xin lỗi vì những lời làm người khác buồn rồi cùng nói chuyện. Mẹ vẫn thương con, kể cả khi con giận.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ worries and fears
  {
    id: 'life.feel-worry',
    world: 'feelings',
    icon: '🫂',
    title: 'Worries and fears',
    vi: 'Khi con lo lắng, sợ hãi',
    goal: 'Con biết lo lắng và sợ hãi là cảm xúc bình thường, và biết nói ra với người lớn để được giúp.',
    talk: [
      'Điều gì làm con thấy sợ hoặc lo nhất? Mình cùng nghĩ cách nhé.',
      'Khi con lo lắng, con muốn bố mẹ làm gì: ôm con, nghe con kể, hay cùng lên kế hoạch?',
      'Vào lớp 1, con mong điều gì nhất, và lo điều gì nhất?'
    ],
    scenarios: [
      {
        id: 'feel-worry-dark',
        tier: 1,
        scene: '🌙🛏️🧒',
        pic: {
          bg: 'bedroom',
          cast: [{ e: '🧒', you: true, think: '😨' }],
          props: ['🧸']
        },
        q: {
          en: 'At bedtime, the light goes off. The room is dark, and you feel scared. What can you do?',
          vi: 'Đến giờ ngủ, đèn tắt. Phòng tối om và con thấy sợ. Con có thể làm gì?'
        },
        choices: [
          {
            e: '💡',
            en: 'Tell Mummy or Daddy you feel scared, and ask for a night light',
            vi: 'Nói với bố mẹ là con sợ, và xin bật một chiếc đèn ngủ',
            v: 'best',
            why: {
              en: 'Lots of children feel scared in the dark. Telling a grown-up means they can help — a night light, a cuddle, a teddy.',
              vi: 'Nhiều bạn nhỏ sợ bóng tối. Nói với bố mẹ để bố mẹ giúp con: đèn ngủ, một cái ôm, hay chú gấu bông.'
            }
          },
          {
            e: '🛌',
            en: 'Hide under the blanket and stay quiet',
            vi: 'Trùm chăn kín đầu và nằm im',
            v: 'ok',
            why: {
              en: 'A cosy blanket can help. Telling a grown-up helps even more — you don’t have to feel scared all by yourself.',
              vi: 'Chăn ấm cũng giúp được đấy. Nhưng nói với bố mẹ còn tốt hơn — con không phải sợ một mình.'
            }
          },
          {
            e: '📱',
            en: 'Watch videos on the iPad until you feel sleepy',
            vi: 'Xem video trên iPad đến khi buồn ngủ',
            v: 'no',
            why: {
              en: 'Screens at bedtime keep our brains awake, so sleep comes later. A night light and a cuddle work better.',
              vi: 'Xem màn hình lúc đi ngủ làm đầu óc tỉnh táo, nên càng khó ngủ. Đèn ngủ và một cái ôm sẽ tốt hơn.'
            }
          }
        ],
        lesson: {
          en: 'Feeling scared of the dark is very common. Tell a grown-up — a night light or a cuddle can help.',
          vi: 'Sợ bóng tối là chuyện rất thường gặp. Hãy nói với bố mẹ — đèn ngủ hay một cái ôm sẽ giúp con.'
        }
      },
      {
        id: 'feel-worry-thunder',
        tier: 1,
        scene: '⛈️🏠🧒',
        pic: {
          bg: 'home',
          cast: [
            { e: '🧒', you: true, x: 35, think: '😨' },
            { e: '👩', size: 'l', flip: true, x: 72 }
          ],
          props: [{ e: '⛈️', x: 18, y: 22, size: 'm' }]
        },
        q: {
          en: 'BOOM! A loud thunderstorm starts, and you jump with fright. What can you do?',
          vi: 'ĐÙNG! Trời đổ mưa giông, sấm nổ to làm con giật mình. Con có thể làm gì?'
        },
        choices: [
          {
            e: '🏠',
            en: 'Stay indoors near a grown-up: thunder is loud, but you are safe inside',
            vi: 'Ở trong nhà, gần bố mẹ: sấm to thật, nhưng ở trong nhà là an toàn',
            v: 'best',
            why: {
              en: 'Thunder is a big noise from the sky. Indoors with a grown-up is the safest, cosiest place to be.',
              vi: 'Sấm là tiếng động lớn trên trời thôi. Ở trong nhà, cạnh người lớn là chỗ an toàn và ấm áp nhất.'
            }
          },
          {
            e: '🙉',
            en: 'Cover your ears and hide by yourself',
            vi: 'Bịt tai và trốn một mình',
            v: 'ok',
            why: {
              en: 'Covering your ears is fine. Being close to a grown-up is even better — they can hug you until the storm passes.',
              vi: 'Bịt tai cũng được. Ở gần bố mẹ còn tốt hơn — bố mẹ sẽ ôm con cho tới khi hết giông.'
            }
          },
          {
            e: '🌩️',
            en: 'Run outside to look at the lightning',
            vi: 'Chạy ra ngoài xem sét',
            v: 'no',
            why: {
              en: 'Lightning is dangerous when you are outside. When there’s thunder, always stay indoors and listen to the rain from inside.',
              vi: 'Ở ngoài trời khi có sét rất nguy hiểm. Khi có sấm, con luôn ở trong nhà và nghe tiếng mưa từ bên trong nhé.'
            }
          }
        ],
        lesson: {
          en: 'Thunder is loud, but indoors you are safe. Stay inside, stay close to a grown-up, and the storm will pass.',
          vi: 'Sấm to thật, nhưng ở trong nhà là an toàn. Ở trong nhà, gần người lớn, rồi cơn giông sẽ qua.'
        }
      },
      {
        id: 'feel-worry-injection',
        tier: 1,
        scene: '💉🩺🧒',
        pic: {
          bg: 'clinic',
          cast: [
            { e: '👨', size: 'l', x: 18 },
            { e: '🧒', you: true, x: 45, think: '😰' },
            { e: '🧑‍⚕️', size: 'l', flip: true, x: 78, say: { en: "It's just a quick poke.", vi: 'Chỉ nhói một chút thôi.' } }
          ],
          props: ['💉']
        },
        q: {
          en: 'You need an injection at the doctor. Your tummy feels wobbly, and you feel scared. What can help?',
          vi: 'Con phải tiêm ở phòng khám. Bụng con thấy nôn nao và con sợ. Điều gì giúp con?'
        },
        choices: [
          {
            e: '🤝',
            en: "Tell Daddy 'I'm scared', hold his hand and take slow breaths",
            vi: 'Nói với bố ‘Con sợ’, nắm tay bố và hít thở thật chậm',
            v: 'best',
            why: {
              en: 'Saying it out loud and holding a hand helps you feel braver. It’s OK to cry, too. The poke is quick, and it keeps you healthy.',
              vi: 'Nói ra và nắm tay bố giúp con can đảm hơn. Khóc cũng không sao. Tiêm chỉ nhói một chút, mà giúp con khoẻ mạnh.'
            }
          },
          {
            e: '🧸',
            en: 'Look away and squeeze your teddy tight',
            vi: 'Quay mặt đi và ôm chặt gấu bông',
            v: 'ok',
            why: {
              en: 'Looking away and squeezing a teddy really can help. Telling Daddy how you feel, and holding his hand, helps even more.',
              vi: 'Quay mặt đi và ôm gấu bông giúp được thật. Nói cho bố biết con sợ và nắm tay bố thì còn tốt hơn nữa.'
            }
          },
          {
            e: '🏃',
            en: 'Run out of the room and hide',
            vi: 'Chạy ra khỏi phòng và trốn',
            v: 'no',
            why: {
              en: 'Running away makes the scary feeling last longer, and the doctor still needs to help you. It’s over in a few seconds!',
              vi: 'Chạy trốn chỉ làm nỗi sợ kéo dài hơn, mà bác sĩ vẫn cần giúp con. Chỉ vài giây là xong thôi!'
            }
          }
        ],
        lesson: {
          en: "Brave doesn't mean not scared. Brave means feeling scared and doing it anyway — with a hand to hold.",
          vi: 'Dũng cảm không phải là không sợ. Dũng cảm là sợ mà vẫn làm — có bàn tay bố mẹ bên cạnh.'
        }
      },
      {
        id: 'feel-worry-dropoff',
        tier: 2,
        scene: '🏫👋🧒',
        value: 'resilience',
        pic: {
          bg: 'schoolgate',
          cast: [
            { e: '👩', size: 'l', x: 18 },
            { e: '🧒', you: true, x: 45, think: '🥺' },
            { e: '🧑‍🏫', size: 'l', flip: true, x: 78, say: { en: 'Good morning! Welcome to P1!', vi: 'Chào con! Chào mừng vào lớp 1!' } }
          ]
        },
        q: {
          en: "It's your first morning of P1. At the school gate, you don't want Mummy to go. Your eyes fill with tears. What can you do?",
          vi: 'Sáng đầu tiên vào lớp 1, đến cổng trường con không muốn mẹ về. Mắt con rưng rưng. Con có thể làm gì?'
        },
        choices: [
          {
            e: '🤗',
            en: "Tell Mummy 'I feel scared', have a big hug, then go in with your teacher",
            vi: 'Nói với mẹ ‘Con sợ’, ôm mẹ thật chặt, rồi đi vào cùng thầy cô',
            v: 'best',
            why: {
              en: 'Lots of P1 children feel this way. Saying it and having a hug helps. You will see Mummy again after school.',
              vi: 'Rất nhiều bạn lớp 1 cũng thấy vậy. Nói ra và ôm mẹ sẽ giúp con. Tan học con lại gặp mẹ.'
            }
          },
          {
            e: '🙅',
            en: 'Hold on to Mummy and refuse to go in',
            vi: 'Bám chặt lấy mẹ, nhất định không vào',
            v: 'no',
            why: {
              en: 'It’s OK to feel scared. But school is a safe place, and your teacher is there to help. You will see Mummy after school.',
              vi: 'Sợ thì không sao cả. Nhưng trường là nơi an toàn, và thầy cô luôn ở đó giúp con. Tan học con sẽ gặp lại mẹ.'
            }
          },
          {
            e: '😶',
            en: "Pretend you're not scared and say nothing",
            vi: 'Giả vờ không sợ và không nói gì',
            v: 'ok',
            why: {
              en: 'Going in is brave! But you don’t have to hide the feeling. Telling Mummy or your teacher helps it feel smaller.',
              vi: 'Con đi vào lớp là dũng cảm lắm! Nhưng không cần giấu cảm xúc đâu. Kể với mẹ hoặc thầy cô sẽ giúp nỗi sợ nhỏ lại.'
            }
          }
        ],
        lesson: {
          en: 'Feeling scared on a first day is normal. Say it, get a hug, and go in — you will see your grown-up after school.',
          vi: 'Ngày đầu đi học thấy sợ là bình thường. Nói ra, ôm một cái, rồi mạnh dạn vào lớp — tan học con lại gặp bố mẹ.'
        }
      },
      {
        id: 'feel-worry-share',
        tier: 2,
        scene: '🍲🗣️🧒',
        pic: {
          bg: 'kitchen',
          cast: [
            { e: '🧒', you: true, x: 32, think: '😔' },
            { e: '👨', size: 'l', flip: true, x: 70, say: { en: 'How was your day?', vi: 'Hôm nay ở trường thế nào con?' } }
          ],
          props: ['🍲', '🍚']
        },
        q: {
          en: "Something at school made you sad today. At dinner, Daddy asks, 'How was your day?' What do you say?",
          vi: 'Hôm nay ở trường có chuyện làm con buồn. Đến bữa tối, bố hỏi: ‘Hôm nay ở trường thế nào con?’ Con trả lời sao?'
        },
        choices: [
          {
            e: '💬',
            en: 'Tell Daddy about the sad thing that happened',
            vi: 'Kể cho bố nghe chuyện làm con buồn',
            v: 'best',
            why: {
              en: 'Sharing a sad feeling makes it lighter. Daddy can listen, give you a hug, and help if needed.',
              vi: 'Chia sẻ nỗi buồn giúp lòng nhẹ đi. Bố sẽ lắng nghe, ôm con, và giúp con nếu cần.'
            }
          },
          {
            e: '🌙',
            en: 'Wait until bedtime, then tell Mummy',
            vi: 'Đợi đến giờ đi ngủ rồi kể với mẹ',
            v: 'ok',
            why: {
              en: 'Telling a grown-up at any time is good. Telling Daddy now means you get a hug and help sooner.',
              vi: 'Kể với người lớn lúc nào cũng tốt. Kể với bố ngay bây giờ thì con được ôm và được giúp sớm hơn.'
            }
          },
          {
            e: '👍',
            en: "Say 'Fine' and keep the sad feeling inside",
            vi: 'Nói ‘Bình thường ạ’ và giữ nỗi buồn trong lòng',
            v: 'no',
            why: {
              en: 'Sad feelings feel heavy when we carry them alone. Your family wants to know — even the sad parts.',
              vi: 'Giữ nỗi buồn một mình thì nặng lòng lắm. Gia đình muốn biết chuyện của con — cả những chuyện buồn.'
            }
          }
        ],
        lesson: {
          en: 'Sad or worried? Tell a grown-up you trust. Talking about feelings makes them lighter.',
          vi: 'Buồn hay lo lắng? Hãy kể với người lớn con tin tưởng. Nói ra giúp lòng con nhẹ hơn.'
        }
      },
      {
        id: 'feel-worry-test',
        tier: 2,
        scene: '📝🌀🧒',
        pic: {
          bg: 'bedroom',
          cast: [
            { e: '🧒', you: true, x: 35, think: '📝❓' },
            { e: '👩', size: 'l', flip: true, x: 72 }
          ],
          props: ['📚']
        },
        q: {
          en: "There's a spelling test tomorrow. You keep thinking, 'What if I get them wrong?' and your tummy feels funny. What helps?",
          vi: 'Ngày mai có bài kiểm tra chính tả. Con cứ nghĩ: ‘Lỡ con viết sai thì sao?’ và bụng thấy khó chịu. Điều gì giúp con?'
        },
        choices: [
          {
            e: '📖',
            en: 'Tell Mummy your worry, and practise a few words together',
            vi: 'Kể với mẹ điều con lo, rồi cùng mẹ ôn lại vài từ',
            v: 'best',
            why: {
              en: 'Talking makes the worry smaller, and a little practice helps you feel ready. Getting some wrong is OK — that’s how we learn.',
              vi: 'Nói ra giúp nỗi lo nhỏ lại, và ôn một chút giúp con thấy sẵn sàng. Sai vài từ cũng không sao — mình học từ đó mà.'
            }
          },
          {
            e: '🤒',
            en: "Say you're sick so you can stay home",
            vi: 'Nói là con bị ốm để được ở nhà',
            v: 'no',
            why: {
              en: 'Staying home won’t make the worry go away — it will be there next time. Tell Mummy the real worry, so she can help.',
              vi: 'Ở nhà không làm nỗi lo biến mất — lần sau nó vẫn còn. Hãy kể thật với mẹ điều con lo để mẹ giúp con.'
            }
          },
          {
            e: '🤫',
            en: 'Keep the worry to yourself all evening',
            vi: 'Giữ nỗi lo trong lòng suốt cả tối',
            v: 'no',
            why: {
              en: 'Worries often grow bigger when we keep them inside. Sharing one with a grown-up helps it shrink.',
              vi: 'Nỗi lo thường càng giấu càng to ra. Kể với người lớn sẽ giúp nó nhỏ lại.'
            }
          }
        ],
        lesson: {
          en: 'A little worry before a test is normal. Share it, practise a bit, then rest — mistakes help you learn.',
          vi: 'Hơi lo trước bài kiểm tra là bình thường. Nói ra, ôn một chút, rồi nghỉ ngơi — viết sai cũng giúp con học thêm.'
        }
      },
      {
        id: 'feel-worry-whatif',
        tier: 3,
        scene: '🛝💭🧒',
        pic: {
          bg: 'bedroom',
          cast: [{ e: '🧒', you: true, think: '🛝❓' }]
        },
        q: {
          en: "Before P1 starts, you keep worrying: 'What if nobody plays with me at recess?' What would help most?",
          vi: 'Trước khi vào lớp 1, con cứ lo: ‘Lỡ giờ ra chơi không ai chơi với con thì sao?’ Điều gì giúp con nhất?'
        },
        choices: [
          {
            e: '🗺️',
            en: 'Tell a grown-up, and plan together what you could say and do',
            vi: 'Kể với bố mẹ, rồi cùng nghĩ xem con có thể nói gì, làm gì',
            v: 'best',
            why: {
              en: "A plan helps a worry shrink. Like: smile, say 'Hi, can I play too?', or tell a teacher if you feel alone.",
              vi: 'Có kế hoạch thì nỗi lo nhỏ lại. Ví dụ: mỉm cười, hỏi ‘Cho tớ chơi với nhé?’, hoặc nói với thầy cô nếu con thấy lẻ loi.'
            }
          },
          {
            e: '🙈',
            en: 'Try very hard not to think about it',
            vi: 'Cố hết sức để không nghĩ đến nữa',
            v: 'ok',
            why: {
              en: 'Pushing a worry away often makes it pop back. Talking about it and making a plan works better.',
              vi: 'Càng cố gạt đi thì nỗi lo càng hay quay lại. Nói ra và lên kế hoạch thì hiệu quả hơn.'
            }
          },
          {
            e: '🏠',
            en: "Decide you don't want to go to school",
            vi: 'Quyết định là con không muốn đi học nữa',
            v: 'no',
            why: {
              en: 'That’s the worry talking! Most children make friends in the first few weeks. Sharing the worry helps you feel ready.',
              vi: 'Đó là nỗi lo đang nói thay con đấy! Hầu hết các bạn đều có bạn mới trong vài tuần đầu. Nói ra giúp con thấy sẵn sàng hơn.'
            }
          }
        ],
        lesson: {
          en: "'What if' worries get smaller with a plan. Share them with a grown-up and think of what you can do.",
          vi: 'Những nỗi lo ‘lỡ như…’ sẽ nhỏ lại khi có kế hoạch. Hãy kể với người lớn và cùng nghĩ xem con có thể làm gì.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ mistakes and trying again
  {
    id: 'life.feel-try',
    world: 'feelings',
    icon: '🌱',
    title: 'Mistakes & trying again',
    vi: 'Sai thì mình thử lại',
    goal: 'Con hiểu sai là một phần của việc học, biết thua vui vẻ, và nói “con chưa làm được” thay vì “con không làm được”.',
    talk: [
      'Kể cho bố mẹ nghe một việc trước đây con chưa làm được mà giờ đã làm được?',
      'Khi thua một trò chơi, con thấy thế nào? Con có thể nói gì với bạn thắng?',
      'Bố mẹ kể cho con nghe một lần bố mẹ làm sai và học được điều gì nhé.'
    ],
    scenarios: [
      {
        id: 'feel-try-lose',
        tier: 1,
        scene: '🎲🏁🧒',
        value: 'resilience',
        pic: {
          bg: 'home',
          cast: [
            { e: '🧒', you: true, x: 30 },
            { e: '🧒', flip: true, x: 70, say: { en: 'I won!', vi: 'Tớ thắng rồi!' } }
          ],
          props: ['🎲']
        },
        q: {
          en: 'You and {friend} play Snakes and Ladders. {friend} wins! You feel disappointed. What can you do?',
          vi: 'Con và {friend} chơi cờ rắn. {friend} thắng! Con thấy hơi buồn. Con có thể làm gì?'
        },
        choices: [
          {
            e: '🤝',
            en: "Say 'Good game!' and ask to play again",
            vi: 'Nói ‘Bạn chơi hay quá!’ và rủ chơi ván nữa',
            v: 'best',
            why: {
              en: 'It’s OK to feel disappointed. Saying ‘good game’ is kind — and next time you might win!',
              vi: 'Buồn một chút cũng không sao. Khen bạn là tử tế — và ván sau biết đâu con thắng!'
            }
          },
          {
            e: '💥',
            en: 'Sweep all the pieces off the board',
            vi: 'Gạt hết quân cờ xuống đất',
            v: 'no',
            why: {
              en: 'Losing can feel really bad. But messing up the game spoils the fun, and {friend} may not want to play again.',
              vi: 'Thua có thể làm con khó chịu lắm. Nhưng làm đổ bàn cờ thì mất vui, và {friend} có thể không muốn chơi nữa.'
            }
          },
          {
            e: '😠',
            en: "Say 'You cheated!'",
            vi: 'Nói ‘Bạn ăn gian!’',
            v: 'no',
            why: {
              en: '{friend} won fairly — this game is mostly luck. Blaming {friend} would hurt their feelings.',
              vi: '{friend} thắng đàng hoàng mà — trò này chủ yếu là may mắn. Đổ lỗi cho bạn sẽ làm bạn buồn.'
            }
          }
        ],
        lesson: {
          en: "Everyone loses sometimes. Say 'good game', take a breath, and play again!",
          vi: 'Ai cũng có lúc thua. Khen bạn chơi hay, hít một hơi, rồi chơi ván mới nào!'
        }
      },
      {
        id: 'feel-try-drawing',
        tier: 1,
        scene: '🎨🐱🧒',
        value: 'resilience',
        pic: {
          bg: 'classroom',
          cast: [{ e: '🧒', you: true, think: '🐱' }],
          props: ['📄', '🖍️']
        },
        q: {
          en: "You're drawing a cat, but the head comes out much too big. You feel like giving up. What can you do?",
          vi: 'Con đang vẽ một con mèo, nhưng cái đầu to quá cỡ. Con thấy muốn bỏ cuộc. Con có thể làm gì?'
        },
        choices: [
          {
            e: '✨',
            en: 'Try again, or turn the mistake into something new',
            vi: 'Vẽ lại, hoặc biến chỗ vẽ hỏng thành một thứ mới',
            v: 'best',
            why: {
              en: 'Mistakes can turn into surprises — a big-headed cat is funny! Every artist has drawings that go wrong.',
              vi: 'Chỗ vẽ hỏng có thể thành điều bất ngờ — mèo đầu to trông ngộ lắm! Hoạ sĩ nào cũng từng vẽ hỏng.'
            }
          },
          {
            e: '🗑️',
            en: "Crumple it up and say 'I'm bad at drawing'",
            vi: 'Vò nát tờ giấy và nói ‘Con vẽ dở lắm’',
            v: 'no',
            why: {
              en: 'It’s OK to feel cross with a drawing. But one wobbly cat doesn’t mean you’re bad at drawing — it means you’re learning.',
              vi: 'Bực mình với bức vẽ cũng không sao. Nhưng một chú mèo hơi méo không có nghĩa là con vẽ dở — mà là con đang học.'
            }
          },
          {
            e: '🙋',
            en: 'Ask {friend} to draw it for you',
            vi: 'Nhờ {friend} vẽ hộ',
            v: 'ok',
            why: {
              en: 'Asking for tips is good, but your own drawing is special. Ask {friend} to show you how, then try it yourself.',
              vi: 'Hỏi bạn cách vẽ là tốt, nhưng tranh tự con vẽ mới đặc biệt. Nhờ {friend} chỉ cách, rồi con tự vẽ nhé.'
            }
          }
        ],
        lesson: {
          en: "Mistakes are part of learning. Don't give up — try again or make something new!",
          vi: 'Sai là một phần của việc học. Đừng bỏ cuộc — vẽ lại hoặc sáng tạo ra thứ mới nhé!'
        }
      },
      {
        id: 'feel-try-notyet',
        tier: 2,
        scene: '👟🎀🧒',
        value: 'resilience',
        pic: {
          bg: 'home',
          cast: [
            { e: '🧒', you: true, x: 30, think: '👟' },
            { e: '🧒', flip: true, x: 70, say: { en: 'Look, I can tie my laces!', vi: 'Nhìn này, tớ buộc được dây giày!' } }
          ],
          props: ['👟']
        },
        q: {
          en: "{friend} can tie shoelaces, but you can't yet. You feel like saying, 'I'll never learn!' What is a better way to think?",
          vi: '{friend} đã tự buộc được dây giày, còn con thì chưa. Con muốn nói: ‘Con sẽ không bao giờ làm được!’ Nghĩ thế nào thì tốt hơn?'
        },
        choices: [
          {
            e: '🌱',
            en: "'I can't do it YET. I'll keep practising.'",
            vi: '‘Con CHƯA làm được. Con sẽ tập tiếp.’',
            v: 'best',
            why: {
              en: '‘Yet’ is a magic word. You get better every time you practise — {friend} had to practise too!',
              vi: 'Chữ ‘chưa’ thật kỳ diệu. Mỗi lần tập, con lại giỏi hơn một chút — {friend} cũng đã phải tập mà!'
            }
          },
          {
            e: '🙇',
            en: 'Ask Mummy to always tie them for you',
            vi: 'Nhờ mẹ buộc giúp mãi mãi',
            v: 'ok',
            why: {
              en: 'Asking for help is good. Ask Mummy to show you slowly — then you try. Soon you’ll do it yourself.',
              vi: 'Nhờ giúp là tốt. Hãy nhờ mẹ làm chậm cho con xem — rồi con tự làm thử. Chẳng mấy chốc con sẽ tự buộc được.'
            }
          },
          {
            e: '😞',
            en: "'I'm just not good at anything.'",
            vi: '‘Con chẳng giỏi cái gì cả.’',
            v: 'no',
            why: {
              en: 'That’s a tired, sad thought — and it isn’t true! You’ve already learned lots of hard things, like counting and writing your name.',
              vi: 'Đó là suy nghĩ lúc mệt và buồn thôi — và nó không đúng đâu! Con đã học được nhiều thứ khó rồi, như đếm số và viết tên mình.'
            }
          }
        ],
        lesson: {
          en: "Add the word 'yet': 'I can't do it YET.' With practice, hard things get easier.",
          vi: 'Thêm chữ ‘chưa’: ‘Con CHƯA làm được.’ Tập luyện thì việc khó sẽ dễ dần.'
        }
      },
      {
        id: 'feel-try-homework',
        tier: 2,
        scene: '📒😣🧒',
        value: 'resilience',
        pic: {
          bg: 'home',
          cast: [{ e: '🧒', you: true, think: '😣' }],
          props: ['📒', '✏️']
        },
        q: {
          en: "A homework question is really hard. You've tried twice, and you feel like crying. What can you do?",
          vi: 'Có một câu bài tập khó quá. Con đã thử hai lần rồi và thấy muốn khóc. Con có thể làm gì?'
        },
        choices: [
          {
            e: '⏸️',
            en: 'Take a short break, then try again or ask a grown-up for a hint',
            vi: 'Nghỉ một chút, rồi thử lại hoặc nhờ người lớn gợi ý',
            v: 'best',
            why: {
              en: 'A short break helps your brain rest. A hint isn’t cheating — it helps you work it out yourself.',
              vi: 'Nghỉ một chút giúp đầu óc thư giãn. Xin gợi ý không phải là gian lận — nó giúp con tự tìm ra đáp án.'
            }
          },
          {
            e: '✏️',
            en: 'Write any answer just to finish',
            vi: 'Viết đại một đáp án cho xong',
            v: 'no',
            why: {
              en: 'Then you don’t get to learn how to do it. It’s OK to find it hard — hard means your brain is growing!',
              vi: 'Như vậy con sẽ không học được cách làm. Thấy khó là bình thường — khó tức là con đang học thêm điều mới đấy!'
            }
          },
          {
            e: '👀',
            en: "Copy {friend}'s answer tomorrow",
            vi: 'Mai chép bài của {friend}',
            v: 'no',
            why: {
              en: 'Copying means you miss the learning, and it isn’t honest. Your teacher wants to see YOUR thinking, even if it’s not right yet.',
              vi: 'Chép bài thì con không học được gì, và cũng không trung thực. Thầy cô muốn thấy con tự nghĩ, dù chưa đúng cũng được.'
            }
          }
        ],
        lesson: {
          en: 'Stuck? Take a break, try again, or ask for a hint. Hard things take time.',
          vi: 'Bị bí? Nghỉ một chút, thử lại, hoặc xin gợi ý. Việc khó thì cần thời gian.'
        }
      },
      {
        id: 'feel-try-wrong',
        tier: 2,
        scene: '✋❌🧒',
        value: 'resilience',
        pic: {
          bg: 'classroom',
          cast: [
            { e: '🙋', you: true, x: 22 },
            { e: '👧', x: 50, say: { en: 'Hee hee!', vi: 'Hi hi!' } },
            { e: '🧑‍🏫', size: 'l', flip: true, x: 82 }
          ]
        },
        q: {
          en: 'You put up your hand and give an answer in class. It is wrong, and a few children giggle. You feel embarrassed. What can you do?',
          vi: 'Con giơ tay trả lời trong lớp nhưng trả lời sai, vài bạn cười khúc khích. Con thấy ngượng. Con có thể làm gì?'
        },
        choices: [
          {
            e: '💪',
            en: 'Remember everyone makes mistakes, and keep putting up your hand',
            vi: 'Nhớ rằng ai cũng có lúc sai, và lần sau vẫn giơ tay',
            v: 'best',
            why: {
              en: 'It took courage to answer. Mistakes help the whole class learn — and your teacher is happy you tried.',
              vi: 'Giơ tay trả lời là rất can đảm. Câu trả lời sai cũng giúp cả lớp học thêm — và thầy cô vui vì con đã thử.'
            }
          },
          {
            e: '🤐',
            en: 'Never put your hand up again',
            vi: 'Từ giờ không bao giờ giơ tay nữa',
            v: 'no',
            why: {
              en: 'Feeling embarrassed is OK, and it passes. If you stop trying, you’ll miss lots of chances to learn — and to be right!',
              vi: 'Ngượng là bình thường, và rồi sẽ qua. Nếu thôi không thử nữa, con sẽ bỏ lỡ nhiều dịp được học — và được trả lời đúng!'
            }
          },
          {
            e: '😡',
            en: 'Shout at the children who giggled',
            vi: 'Hét vào mặt các bạn đã cười',
            v: 'no',
            why: {
              en: 'It’s OK to feel cross. But shouting in class can get you into trouble. If the giggling keeps happening, tell your teacher.',
              vi: 'Bực mình thì không sao. Nhưng hét trong lớp sẽ làm con gặp rắc rối. Nếu các bạn cứ cười như vậy, con hãy nói với thầy cô.'
            }
          }
        ],
        lesson: {
          en: 'Wrong answers are part of learning. Brave learners keep putting their hands up!',
          vi: 'Trả lời sai là một phần của việc học. Người học dũng cảm vẫn tiếp tục giơ tay!'
        }
      },
      {
        id: 'feel-try-second',
        tier: 3,
        scene: '🖼️🏆🧒',
        value: 'resilience',
        pic: {
          bg: 'classroom',
          cast: [
            { e: '🧒', you: true, x: 20 },
            { e: '🧒', x: 50, say: { en: 'I won the prize!', vi: 'Tớ được giải rồi!' } },
            { e: '🧑‍🏫', size: 'l', flip: true, x: 82 }
          ],
          props: ['🏆', '🖼️']
        },
        q: {
          en: "Your class has a drawing competition. You worked hard, but {friend} wins and you don't. You feel disappointed. What is best?",
          vi: 'Lớp con có cuộc thi vẽ. Con đã cố gắng rất nhiều, nhưng {friend} đạt giải còn con thì không. Con thấy buồn. Làm sao là tốt nhất?'
        },
        choices: [
          {
            e: '👏',
            en: 'Feel sad for a bit, then clap for {friend} and be proud of your work',
            vi: 'Buồn một chút, rồi vỗ tay chúc mừng {friend} và tự hào về tranh của mình',
            v: 'best',
            why: {
              en: 'Disappointed is a real feeling. You can feel it AND be happy for {friend} AND be proud of your hard work.',
              vi: 'Buồn là cảm xúc thật. Con có thể vừa buồn, vừa vui cho {friend}, vừa tự hào vì mình đã cố gắng.'
            }
          },
          {
            e: '😎',
            en: "Pretend you don't care at all",
            vi: 'Giả vờ như con chẳng quan tâm',
            v: 'ok',
            why: {
              en: 'Staying calm is good, but you don’t have to pretend. You can say ‘I’m a bit sad’ and still clap for {friend}.',
              vi: 'Giữ bình tĩnh là tốt, nhưng con không cần giả vờ đâu. Con có thể nói ‘Con hơi buồn’ mà vẫn vỗ tay chúc mừng {friend}.'
            }
          },
          {
            e: '👎',
            en: "Say {friend}'s drawing isn't that good",
            vi: 'Nói tranh của {friend} cũng chẳng đẹp lắm',
            v: 'no',
            why: {
              en: 'When we feel disappointed, unkind words can slip out. But they would hurt {friend}. Try ‘Well done!’ — it’s hard, and it’s kind.',
              vi: 'Khi buồn, mình dễ buột miệng nói lời không hay. Nhưng câu đó làm {friend} buồn. Thử nói ‘Bạn giỏi quá!’ — khó đấy, nhưng tử tế.'
            }
          }
        ],
        lesson: {
          en: 'You can feel disappointed and still be kind. Clap for others, and be proud of your own effort.',
          vi: 'Con có thể buồn mà vẫn tử tế. Vỗ tay chúc mừng bạn, và tự hào vì sự cố gắng của mình.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ how others feel (empathy)
  {
    id: 'life.feel-others',
    world: 'feelings',
    icon: '💞',
    title: 'How do others feel?',
    vi: 'Hiểu cảm xúc người khác',
    goal: 'Con biết để ý nét mặt, lời nói của người khác để đoán họ đang cảm thấy gì, và biết quan tâm đúng cách.',
    talk: [
      'Hôm nay con có thấy ai buồn hay lo lắng không? Con đoán vì sao?',
      'Khi con buồn, con thích người khác làm gì cho con?',
      'Nếu bạn đang giận, con nên hỏi han ngay, hay để bạn bình tĩnh một chút?'
    ],
    scenarios: [
      {
        id: 'feel-others-alone',
        tier: 1,
        scene: '🛝🪑🧒',
        value: 'care',
        pic: {
          bg: 'playground',
          cast: [
            { e: '🧒', you: true, x: 25 },
            { e: '🧒', flip: true, x: 70, think: '😢' }
          ]
        },
        q: {
          en: 'At the playground, {friend} is sitting alone on a bench, crying. How might {friend} feel, and what can you do?',
          vi: 'Ở sân chơi, {friend} ngồi một mình trên ghế và đang khóc. {friend} có thể đang thấy thế nào, và con có thể làm gì?'
        },
        choices: [
          {
            e: '🫶',
            en: "Go over and ask gently, 'Are you OK? Can I sit with you?'",
            vi: 'Lại gần hỏi nhẹ nhàng: ‘Bạn có sao không? Mình ngồi với bạn nhé?’',
            v: 'best',
            why: {
              en: '{friend} might feel sad or lonely. A gentle question shows you care. If {friend} is hurt, get a grown-up too.',
              vi: '{friend} có thể đang buồn hoặc thấy lẻ loi. Một câu hỏi nhẹ nhàng cho bạn biết con quan tâm. Nếu bạn bị đau, hãy gọi người lớn.'
            }
          },
          {
            e: '🙈',
            en: "Walk past and pretend you didn't see",
            vi: 'Đi ngang qua và giả vờ như không thấy',
            v: 'no',
            why: {
              en: '{friend} might feel even lonelier. Even a small ‘Are you OK?’ can help a lot.',
              vi: '{friend} có thể càng thấy cô đơn hơn. Chỉ một câu ‘Bạn có sao không?’ cũng giúp được nhiều lắm.'
            }
          },
          {
            e: '😆',
            en: "Laugh and say, 'Crybaby!'",
            vi: 'Cười và trêu: ‘Đồ mít ướt!’',
            v: 'no',
            why: {
              en: 'Crying is how many of us show we are sad. Teasing makes it hurt more. Kind words help {friend} feel better.',
              vi: 'Khóc là cách nhiều người thể hiện nỗi buồn. Trêu chọc chỉ làm bạn đau lòng thêm. Lời tử tế giúp {friend} thấy dễ chịu hơn.'
            }
          }
        ],
        lesson: {
          en: "When someone looks sad, ask, 'Are you OK?' A little kindness can make a big difference.",
          vi: 'Khi thấy ai đó buồn, hãy hỏi: ‘Bạn có sao không?’. Một chút tử tế có thể giúp rất nhiều.'
        }
      },
      {
        id: 'feel-others-tired',
        tier: 1,
        scene: '👩🛋️🧒',
        value: 'care',
        pic: {
          bg: 'home',
          cast: [
            { e: '🧒', you: true, x: 30 },
            { e: '👩', size: 'l', flip: true, x: 70, think: '😮‍💨' }
          ],
          props: ['👜']
        },
        q: {
          en: 'Mummy comes home from work. She sits down slowly and sighs. How might Mummy feel, and what can you do?',
          vi: 'Mẹ đi làm về, ngồi xuống chậm rãi và thở dài. Mẹ có thể đang thấy thế nào, và con có thể làm gì?'
        },
        choices: [
          {
            e: '🤗',
            en: 'Give Mummy a hug and offer to help set the table',
            vi: 'Ôm mẹ một cái và xin phụ mẹ bày bát đũa',
            v: 'best',
            why: {
              en: 'Mummy is probably tired. A hug and a little help can make a tired person feel loved.',
              vi: 'Có lẽ mẹ đang mệt. Một cái ôm và chút giúp đỡ làm người đang mệt thấy được yêu thương.'
            }
          },
          {
            e: '🎮',
            en: 'Ask Mummy to play with you right now, again and again',
            vi: 'Đòi mẹ chơi với con ngay, hỏi đi hỏi lại',
            v: 'no',
            why: {
              en: 'Wanting to play with Mummy is lovely! But she may need a rest first. Let her rest a little, then ask.',
              vi: 'Muốn chơi với mẹ là điều rất dễ thương! Nhưng có lẽ mẹ cần nghỉ trước. Để mẹ nghỉ một chút rồi con hãy rủ mẹ nhé.'
            }
          },
          {
            e: '📺',
            en: 'Turn the TV up loud',
            vi: 'Bật TV thật to',
            v: 'no',
            why: {
              en: 'Loud noise can make a tired person feel even more tired. A quiet, cosy home helps Mummy rest.',
              vi: 'Tiếng ồn làm người đang mệt càng mệt hơn. Nhà yên tĩnh, ấm cúng giúp mẹ nghỉ ngơi.'
            }
          }
        ],
        lesson: {
          en: 'Look for clues: slow moves and sighs can mean tired. A hug and a little help show you care.',
          vi: 'Để ý dấu hiệu: đi lại chậm và thở dài có thể là đang mệt. Một cái ôm và chút giúp đỡ cho thấy con quan tâm.'
        }
      },
      {
        id: 'feel-others-new',
        tier: 2,
        scene: '🏫🌏🧒',
        value: 'care',
        pic: {
          bg: 'classroom',
          cast: [
            { e: '🧒', you: true, x: 20 },
            { e: '🧒', flip: true, x: 50, think: '😟' },
            { e: '🧑‍🏫', size: 'l', flip: true, x: 82, say: { en: 'This is our new classmate!', vi: 'Đây là bạn mới của lớp mình!' } }
          ]
        },
        q: {
          en: "A new child from another country joins your class. They don't speak much English yet and look around with worried eyes. What could you do?",
          vi: 'Lớp con có một bạn mới từ nước khác đến. Bạn chưa nói được nhiều tiếng Anh và nhìn quanh với ánh mắt lo lắng. Con có thể làm gì?'
        },
        choices: [
          {
            e: '😊',
            en: 'Smile, say hi, and show the new child where things are',
            vi: 'Mỉm cười, chào bạn, và chỉ cho bạn chỗ để đồ, chỗ đi vệ sinh',
            v: 'best',
            why: {
              en: 'A smile works in every language. Being new can feel scary — a friendly helper makes a big difference.',
              vi: 'Nụ cười thì ngôn ngữ nào cũng hiểu. Là học sinh mới thì dễ thấy sợ — có một bạn thân thiện giúp đỡ sẽ khác hẳn.'
            }
          },
          {
            e: '⏳',
            en: 'Wait for the new child to talk to you first',
            vi: 'Chờ bạn mới bắt chuyện với con trước',
            v: 'ok',
            why: {
              en: 'The new child might be too shy to start. You could be brave and say hi first — it’s a kind thing to do.',
              vi: 'Bạn mới có thể đang ngại, chưa dám bắt chuyện. Con hãy dũng cảm chào trước — đó là việc làm tử tế.'
            }
          },
          {
            e: '🤭',
            en: 'Copy the way the new child talks, to be funny',
            vi: 'Bắt chước cách bạn mới nói cho vui',
            v: 'no',
            why: {
              en: 'It might seem funny, but it can make the new child feel sad and left out. Learning a new language is hard!',
              vi: 'Có thể con thấy vui, nhưng bạn mới sẽ thấy buồn và lạc lõng. Học một ngôn ngữ mới khó lắm đấy!'
            }
          }
        ],
        lesson: {
          en: "Imagine how others feel. Being new is hard — a smile and a 'hi' help someone feel at home.",
          vi: 'Hãy thử đặt mình vào chỗ người khác. Là người mới thì khó lắm — một nụ cười và lời chào giúp bạn thấy được chào đón.'
        }
      },
      {
        id: 'feel-others-relay',
        tier: 2,
        scene: '🏃🏁🧒',
        value: 'care',
        pic: {
          bg: 'schoolyard',
          cast: [
            { e: '🧒', you: true, x: 30 },
            { e: '🧒', flip: true, x: 65, think: '😢' }
          ],
          props: ['🏁']
        },
        q: {
          en: 'On Sports Day, {friend} drops the baton, and your team loses the race. {friend} starts to cry. What do you say?',
          vi: 'Ngày hội thể thao, {friend} làm rơi gậy tiếp sức và đội con bị thua. {friend} bật khóc. Con nói gì?'
        },
        choices: [
          {
            e: '🤝',
            en: "'It's OK, {friend}. We all tried our best!'",
            vi: '‘Không sao đâu {friend}. Cả đội đã cố hết sức rồi!’',
            v: 'best',
            why: {
              en: '{friend} already feels bad. Kind words help {friend} feel better — that’s what good teammates do.',
              vi: '{friend} đang buồn lắm rồi. Lời an ủi giúp {friend} thấy đỡ hơn — đồng đội tốt là như vậy.'
            }
          },
          {
            e: '😠',
            en: "'We lost because of you!'",
            vi: '‘Tại bạn mà đội mình thua!’',
            v: 'no',
            why: {
              en: 'It’s OK to feel disappointed. But blaming {friend} hurts. Anyone can drop a baton — next time it could be you.',
              vi: 'Con thấy tiếc là bình thường. Nhưng đổ lỗi cho {friend} sẽ làm bạn tổn thương. Ai cũng có thể làm rơi gậy — lần sau biết đâu là con.'
            }
          },
          {
            e: '🚶',
            en: 'Walk away and say nothing',
            vi: 'Bỏ đi và không nói gì',
            v: 'no',
            why: {
              en: '{friend} might think everyone is cross. A few kind words can turn a sad moment around.',
              vi: '{friend} có thể nghĩ cả đội đang giận mình. Vài lời tử tế có thể làm bạn vui lên.'
            }
          }
        ],
        lesson: {
          en: 'When a friend makes a mistake, think about how they feel. Kind words help more than blame.',
          vi: 'Khi bạn mắc lỗi, hãy nghĩ xem bạn đang thấy thế nào. Lời tử tế giúp ích hơn lời trách móc.'
        }
      },
      {
        id: 'feel-others-grandpa',
        tier: 2,
        scene: '👴🛋️🧒',
        value: 'care',
        pic: {
          bg: 'home',
          cast: [
            { e: '🧒', you: true, x: 30, think: '🦘' },
            { e: '👴', size: 'l', flip: true, x: 72, think: '🤒' }
          ]
        },
        q: {
          en: "Grandpa isn't feeling well and is resting on the sofa. You want to play a noisy jumping game. What could you do?",
          vi: 'Ông đang không khoẻ và nằm nghỉ trên ghế sofa. Con đang muốn chơi trò nhảy nhót ồn ào. Con có thể làm gì?'
        },
        choices: [
          {
            e: '🎨',
            en: 'Play a quiet game, and maybe make Grandpa a get-well card',
            vi: 'Chơi trò gì đó nhẹ nhàng, và có thể vẽ tặng ông tấm thiệp chúc mau khoẻ',
            v: 'best',
            why: {
              en: 'Grandpa needs rest to get better. A quiet game and a card show you’re thinking of him.',
              vi: 'Ông cần nghỉ ngơi để mau khoẻ. Chơi nhẹ nhàng và tặng thiệp cho ông biết con thương ông.'
            }
          },
          {
            e: '🦘',
            en: "Jump around anyway — it's your playtime",
            vi: 'Cứ nhảy nhót thôi — giờ chơi của con mà',
            v: 'no',
            why: {
              en: 'Playing is great! But loud jumping can stop Grandpa from resting. You can jump later, or outside.',
              vi: 'Chơi là điều tốt! Nhưng nhảy ồn ào sẽ làm ông không nghỉ được. Con có thể nhảy sau, hoặc ra ngoài chơi.'
            }
          },
          {
            e: '🙋',
            en: 'Ask Grandpa to get up and play with you',
            vi: 'Rủ ông dậy chơi cùng con',
            v: 'no',
            why: {
              en: 'Grandpa would love to play when he is well. Right now his body needs rest — you can play together soon.',
              vi: 'Ông sẽ rất vui được chơi với con khi ông khoẻ. Bây giờ ông cần nghỉ ngơi — rồi hai ông cháu sẽ chơi sau.'
            }
          }
        ],
        lesson: {
          en: 'When someone is unwell, think about what they need: quiet, rest and a little kindness.',
          vi: 'Khi ai đó ốm, hãy nghĩ xem họ cần gì: yên tĩnh, nghỉ ngơi và một chút quan tâm.'
        }
      },
      {
        id: 'feel-others-upset',
        tier: 3,
        scene: '🎲😤🧒',
        value: 'harmony',
        pic: {
          bg: 'home',
          cast: [
            { e: '🧒', you: true, x: 28 },
            { e: '🧒', flip: true, x: 70, say: { en: "That's not fair!", vi: 'Không công bằng!' } }
          ],
          props: ['🎲']
        },
        q: {
          en: "You win a game. {friend} shouts, 'That's not fair!' and stomps away. What is the kindest thing to do?",
          vi: 'Con thắng một trò chơi. {friend} hét lên: ‘Không công bằng!’ rồi dậm chân bỏ đi. Con làm gì là tử tế nhất?'
        },
        choices: [
          {
            e: '⏳',
            en: "Give {friend} a little time to calm down, then ask, 'Want to play again?'",
            vi: 'Cho {friend} chút thời gian bình tĩnh lại, rồi hỏi: ‘Mình chơi ván nữa nhé?’',
            v: 'best',
            why: {
              en: '{friend} feels upset about losing. A little space helps big feelings settle, and then a friendly question helps.',
              vi: '{friend} đang buồn vì thua. Để bạn yên một chút giúp cảm xúc lắng xuống, rồi một lời rủ thân thiện sẽ giúp bạn vui lại.'
            }
          },
          {
            e: '🏃',
            en: "Run after {friend} and keep saying sorry",
            vi: 'Chạy theo {friend} và xin lỗi liên tục',
            v: 'ok',
            why: {
              en: 'You care — that’s lovely. But you didn’t do anything wrong, and {friend} might need some quiet time first.',
              vi: 'Con quan tâm bạn — thật dễ thương. Nhưng con không làm gì sai cả, và có lẽ {friend} cần một chút yên tĩnh trước.'
            }
          },
          {
            e: '🏆',
            en: "Shout, 'I won, you lost!'",
            vi: 'Hét lên: ‘Mình thắng, bạn thua rồi!’',
            v: 'no',
            why: {
              en: 'Winning feels great! But teasing {friend} makes the upset feeling much bigger. Be a kind winner.',
              vi: 'Thắng thì vui lắm! Nhưng trêu {friend} sẽ làm bạn càng buồn hơn. Hãy là người thắng biết cư xử tử tế.'
            }
          },
          {
            e: '😤',
            en: "Shout back, 'You're a sore loser!'",
            vi: 'Hét lại: ‘Thua rồi còn cay cú!’',
            v: 'no',
            why: {
              en: 'Shouting back makes two upset people. {friend}’s feeling is big right now, but it will pass.',
              vi: 'Hét lại thì cả hai cùng bực. Cảm xúc của {friend} đang lớn thôi, rồi sẽ qua.'
            }
          }
        ],
        lesson: {
          en: "When a friend is upset, they may need a little space. Stay kind, and try again when they're calm.",
          vi: 'Khi bạn đang buồn bực, có thể bạn cần chút thời gian một mình. Hãy cứ tử tế, rồi rủ lại khi bạn đã bình tĩnh.'
        }
      }
    ]
  }
];
