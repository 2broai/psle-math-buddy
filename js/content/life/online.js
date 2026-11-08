// World: online — see README.md in this folder for the format.
export const TOPICS = [
  // ------------------------------------------------------------------ personal information
  {
    id: 'life.my-info',
    world: 'online',
    icon: '🔒',
    title: 'My info is private',
    vi: 'Thông tin riêng của con',
    goal: 'Con biết giữ kín họ tên, địa chỉ, trường học, số điện thoại, mật khẩu và hình ảnh, luôn hỏi bố mẹ trước khi chia sẻ, và tôn trọng ảnh của người khác.',
    talk: [
      'Những thông tin nào của con là "riêng tư", không được nói với người trên mạng?',
      'Mật khẩu thì được nói cho ai biết? Bạn thân có được biết không?',
      'Trước khi gửi ảnh của một bạn khác cho người khác xem, con cần làm gì?',
      'Mình cùng nghĩ một biệt danh thật vui để dùng khi chơi game nhé?'
    ],
    scenarios: [
      {
        id: 'myinfo-prize-form',
        tier: 1,
        scene: '🎮📝🏠',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '🎁' }, { e: '🎁', screen: true, say: { en: 'Type your name and address!', vi: 'Nhập tên và địa chỉ nhà!' } }] },
        q: {
          en: 'A game says, "Type your full name, home address and phone number to get a free prize!" What should you do?',
          vi: 'Một trò chơi hiện chữ: "Nhập họ tên, địa chỉ nhà và số điện thoại để nhận quà miễn phí!" Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Stop and show a grown-up before you type anything',
            vi: 'Dừng lại và cho bố mẹ xem trước khi gõ gì',
            v: 'best',
            why: {
              en: 'Your name, address and phone number are private. Your grown-up can tell if it is a trick.',
              vi: 'Họ tên, địa chỉ và số điện thoại là thông tin riêng. Bố mẹ sẽ biết đó có phải trò lừa không.'
            }
          },
          {
            e: '⌨️',
            en: 'Type it all in quickly to get the prize',
            vi: 'Gõ hết vào thật nhanh để nhận quà',
            v: 'no',
            why: {
              en: 'Free prizes online are often tricks to get private information. Always ask first.',
              vi: 'Quà miễn phí trên mạng thường là mẹo để lấy thông tin riêng. Luôn hỏi bố mẹ trước nhé.'
            }
          },
          {
            e: '✏️',
            en: 'Type only your name and address, not the phone number',
            vi: 'Chỉ nhập tên và địa chỉ, không nhập số điện thoại',
            v: 'no',
            why: {
              en: 'Your name and address are private too. Ask your grown-up before you type anything.',
              vi: 'Tên và địa chỉ cũng là thông tin riêng. Hỏi bố mẹ trước khi gõ bất cứ thứ gì.'
            }
          }
        ],
        lesson: {
          en: 'Your full name, address, school and phone number are private. Ask your grown-up before you share them.',
          vi: 'Họ tên đầy đủ, địa chỉ, trường học và số điện thoại là thông tin riêng. Hỏi bố mẹ trước khi chia sẻ.'
        }
      },
      {
        id: 'myinfo-password',
        tier: 1,
        scene: '🔑🧒🎮',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '🔑' }, { e: '🧒', say: { en: 'Tell me your game password!', vi: 'Cho mình mật khẩu game đi!' } }], props: ['📱'] },
        q: {
          en: '{friend} says, "Tell me your game password, and I\'ll help you get to the next level!" What should you do?',
          vi: '{friend} nói: "Cho mình mật khẩu game của bạn đi, mình chơi giúp cho lên cấp!" Con nên làm gì?'
        },
        choices: [
          {
            e: '🔒',
            en: 'Say, "Sorry, my password is just for me and my parents"',
            vi: 'Nói: "Xin lỗi, mật khẩu chỉ mình và bố mẹ mình biết thôi"',
            v: 'best',
            why: {
              en: "Even good friends don't share passwords. You can still play together, side by side.",
              vi: 'Bạn thân cũng không chia sẻ mật khẩu với nhau. Hai bạn vẫn có thể ngồi chơi cùng nhau mà.'
            }
          },
          {
            e: '🔑',
            en: 'Tell {friend}, because {friend} is your best friend',
            vi: 'Nói cho {friend}, vì {friend} là bạn thân mà',
            v: 'no',
            why: {
              en: 'With your password, someone could change your game or buy things by mistake. Keep it for you and your grown-up.',
              vi: 'Có mật khẩu, người khác có thể thay đổi game của con hoặc lỡ mua đồ. Chỉ con và bố mẹ biết thôi.'
            }
          },
          {
            e: '📝',
            en: 'Write it on a note and give it to {friend} secretly',
            vi: 'Viết ra giấy rồi lén đưa cho {friend}',
            v: 'no',
            why: {
              en: 'A note can get lost or be seen by anyone. Sharing in secret is still sharing.',
              vi: 'Tờ giấy có thể bị rơi hoặc ai đó nhìn thấy. Lén đưa thì vẫn là chia sẻ mật khẩu.'
            }
          }
        ],
        lesson: {
          en: 'Passwords are only for you and your parents, not even your best friend.',
          vi: 'Mật khẩu chỉ con và bố mẹ biết, kể cả bạn thân cũng không.'
        }
      },
      {
        id: 'myinfo-school-name',
        tier: 2,
        scene: '🎮💬🏫',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '❓' }, { e: '👤', screen: true, say: { en: 'Which school do you go to?', vi: 'Bạn học trường nào thế?' } }] },
        q: {
          en: 'You are playing an online game. Another player types, "Which school do you go to?" What should you do?',
          vi: 'Con đang chơi game trên mạng. Một người chơi khác nhắn: "Bạn học trường nào thế?" Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: "Don't answer, and tell a grown-up",
            vi: 'Không trả lời, và kể với bố mẹ',
            v: 'best',
            why: {
              en: 'Your school is private, and people online may not be who they say. A grown-up should know someone asked.',
              vi: 'Trường của con là thông tin riêng, và người trên mạng có thể không như họ nói. Bố mẹ cần biết có người hỏi.'
            }
          },
          {
            e: '🏫',
            en: "Tell them, because it's just the name of a school",
            vi: 'Nói luôn, chỉ là tên trường thôi mà',
            v: 'no',
            why: {
              en: 'The name of your school tells someone where to find you every day. Keep it private.',
              vi: 'Biết tên trường là người khác biết ngày nào con cũng ở đâu. Hãy giữ kín nhé.'
            }
          },
          {
            e: '🙊',
            en: 'Type "I can\'t tell you that" and keep playing',
            vi: 'Nhắn "Mình không nói được" rồi chơi tiếp',
            v: 'ok',
            why: {
              en: 'Keeping it private was right! But tell a grown-up too, so they know someone asked.',
              vi: 'Giữ kín là đúng! Nhưng con cũng kể với bố mẹ nữa, để bố mẹ biết có người hỏi.'
            }
          }
        ],
        lesson: {
          en: "If someone online asks where you live or go to school, don't answer. Tell a grown-up.",
          vi: 'Ai trên mạng hỏi con ở đâu hay học trường nào, đừng trả lời, hãy kể với bố mẹ.'
        }
      },
      {
        id: 'myinfo-player-name',
        tier: 2,
        scene: '🎮🏷️🐉',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '🤔' }, { e: '🏷️', screen: true, say: { en: 'Choose your player name', vi: 'Chọn tên người chơi' } }] },
        q: {
          en: 'You are making a player name for a new game. Which name is best?',
          vi: 'Con đang đặt tên người chơi cho một game mới. Tên nào là tốt nhất?'
        },
        choices: [
          {
            e: '🐉',
            en: 'A fun made-up name, like "StarDragon"',
            vi: 'Một biệt danh vui, như "RồngSaoBăng"',
            v: 'best',
            why: {
              en: "A made-up name keeps your real name private, and it's fun! Ask a grown-up to help you set it up.",
              vi: 'Biệt danh giữ kín tên thật của con mà lại vui! Nhờ bố mẹ giúp con đặt nhé.'
            }
          },
          {
            e: '🪪',
            en: 'Your full name and your age',
            vi: 'Họ tên đầy đủ và tuổi của con',
            v: 'no',
            why: {
              en: 'Your full name and age are private. Strangers in the game would know who you are.',
              vi: 'Họ tên đầy đủ và tuổi là thông tin riêng. Người lạ trong game sẽ biết con là ai.'
            }
          },
          {
            e: '🙂',
            en: 'Just your first name',
            vi: 'Chỉ tên gọi của con',
            v: 'ok',
            why: {
              en: 'That is better than your full name! But a made-up name keeps you even more private.',
              vi: 'Như vậy tốt hơn họ tên đầy đủ! Nhưng biệt danh thì còn giữ kín cho con hơn nữa.'
            }
          }
        ],
        lesson: {
          en: 'Online, use a fun made-up name, not your real name. Ask a grown-up to help set it up.',
          vi: 'Trên mạng, hãy dùng biệt danh vui thay vì tên thật. Nhờ bố mẹ giúp đặt nhé.'
        }
      },
      {
        id: 'myinfo-friend-photo',
        tier: 2,
        value: 'respect',
        scene: '📸🍦😂',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '📸😂' }, { e: '🧒', think: '🍦' }], props: ['📱'] },
        q: {
          en: 'You took a funny photo of {friend} with a big ice-cream moustache. You want to send it to the family chat. What should you do first?',
          vi: 'Con chụp được tấm ảnh {friend} dính kem đầy mép trông rất buồn cười. Con muốn gửi vào nhóm chat gia đình. Con cần làm gì trước?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Ask {friend} if it is OK to share it',
            vi: 'Hỏi {friend} xem có đồng ý cho gửi không',
            v: 'best',
            why: {
              en: "It's a photo of {friend}, so {friend} gets to choose. If the answer is no, don't send it.",
              vi: 'Đó là ảnh của {friend}, nên {friend} được quyết định. Nếu bạn không đồng ý thì đừng gửi.'
            }
          },
          {
            e: '📤',
            en: 'Send it, because it is so funny!',
            vi: 'Gửi luôn, vì buồn cười quá mà!',
            v: 'no',
            why: {
              en: '{friend} might feel embarrassed if lots of people see it. Always ask first.',
              vi: '{friend} có thể thấy xấu hổ nếu nhiều người xem. Luôn hỏi bạn trước nhé.'
            }
          },
          {
            e: '🙈',
            en: "Send it, but don't tell {friend}",
            vi: 'Gửi đi nhưng không cho {friend} biết',
            v: 'no',
            why: {
              en: "That isn't fair to {friend}. How would you feel if someone shared a silly photo of you?",
              vi: 'Như vậy không công bằng với {friend}. Nếu ai gửi ảnh xấu của con đi, con thấy sao?'
            }
          }
        ],
        lesson: {
          en: "Ask before you share a photo of someone else. If they say no, don't send it.",
          vi: 'Hỏi trước khi chia sẻ ảnh của người khác. Nếu bạn không đồng ý thì đừng gửi.'
        }
      },
      {
        id: 'myinfo-video-uniform',
        tier: 3,
        scene: '📹👕🏠',
        pic: { bg: 'bedroom', cast: [{ e: '🧒', you: true, think: '📤' }], props: ['📱', '👕'] },
        q: {
          en: 'You made a fun video in your school uniform, showing your bedroom. You want to put it online for everyone to see. What should you do?',
          vi: 'Con quay một video vui, mặc đồng phục trường và khoe phòng ngủ của con. Con muốn đăng lên mạng cho mọi người xem. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Ask a grown-up first, so they can check what the video shows',
            vi: 'Hỏi bố mẹ trước, để bố mẹ xem video có lộ gì không',
            v: 'best',
            why: {
              en: 'Photos and videos can show private things, like your face, your school or your home. A grown-up can help.',
              vi: 'Ảnh và video có thể làm lộ thông tin riêng như khuôn mặt, trường hay nhà của con. Bố mẹ sẽ giúp con.'
            }
          },
          {
            e: '📤',
            en: 'Post it, because everyone will love it!',
            vi: 'Đăng luôn, vì ai cũng sẽ thích!',
            v: 'no',
            why: {
              en: 'Once something is online, lots of people can see it and keep it. Always ask your grown-up first.',
              vi: 'Đã đưa lên mạng thì rất nhiều người có thể xem và lưu lại. Luôn hỏi bố mẹ trước nhé.'
            }
          },
          {
            e: '👕',
            en: 'Change out of your uniform, then post it',
            vi: 'Thay đồng phục ra rồi đăng',
            v: 'ok',
            why: {
              en: 'Smart: your uniform shows your school! But a video can show other private things too, so ask first.',
              vi: 'Con nghĩ hay lắm, đồng phục cho biết trường của con! Nhưng video còn lộ nhiều thứ khác, nên hãy hỏi trước.'
            }
          }
        ],
        lesson: {
          en: 'Ask your grown-up before you share any photo or video online. Pictures can show private things.',
          vi: 'Hỏi bố mẹ trước khi chia sẻ ảnh hay video lên mạng. Hình ảnh có thể làm lộ thông tin riêng.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ people online
  {
    id: 'life.online-people',
    world: 'online',
    icon: '🎭',
    title: 'People online',
    vi: 'Người lạ trên mạng',
    goal: 'Con hiểu người trên mạng có thể không phải là người như họ nói: không kết bạn, không gửi ảnh, không nhắn riêng, không hẹn gặp, và luôn kể với bố mẹ.',
    talk: [
      'Làm sao con biết chắc một người chơi trên mạng thật sự là một bạn nhỏ 7 tuổi?',
      'Nếu ai trên mạng xin ảnh của con hay rủ gặp mặt, con sẽ làm gì?',
      'Ai trên mạng dặn "đừng kể với bố mẹ", con nghĩ vì sao họ lại nói vậy?'
    ],
    scenarios: [
      {
        id: 'netfriend-request',
        tier: 1,
        scene: '🎮👤➕',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '❓' }, { e: '👤', screen: true, say: { en: 'Friend request: CoolKid', vi: 'Lời mời kết bạn: CoolKid' } }] },
        q: {
          en: "Someone you don't know sends you a friend request in your game. What should you do?",
          vi: 'Một người con không quen gửi lời mời kết bạn trong game. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: "Don't accept. Show a grown-up",
            vi: 'Không đồng ý. Cho bố mẹ xem',
            v: 'best',
            why: {
              en: "Online friends should be people you know in real life, with your grown-up's OK.",
              vi: 'Bạn trên mạng chỉ nên là người con quen ngoài đời và được bố mẹ đồng ý.'
            }
          },
          {
            e: '✅',
            en: 'Accept, because more friends is more fun',
            vi: 'Đồng ý luôn, nhiều bạn càng vui',
            v: 'no',
            why: {
              en: 'People online may not be who they say they are. Only add people you know in real life.',
              vi: 'Người trên mạng có thể không phải là người như họ nói. Chỉ kết bạn với người con quen ngoài đời.'
            }
          },
          {
            e: '💬',
            en: 'Send a message to ask who they are',
            vi: 'Nhắn tin hỏi họ là ai',
            v: 'no',
            why: {
              en: "They could say anything, and you can't check. Show a grown-up instead.",
              vi: 'Họ có thể nói bất cứ điều gì, mà con không kiểm tra được. Cho bố mẹ xem nhé.'
            }
          }
        ],
        lesson: {
          en: 'Only be friends online with people you know in real life. Ask your grown-up first.',
          vi: 'Chỉ kết bạn trên mạng với người con quen ngoài đời, và hỏi bố mẹ trước.'
        }
      },
      {
        id: 'netfriend-asks-photo',
        tier: 1,
        scene: '💬📸❓',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '😟' }, { e: '👤', screen: true, say: { en: 'Send me a photo of you!', vi: 'Gửi mình ảnh của bạn đi!' } }] },
        q: {
          en: 'Someone you chat with in a game asks, "Can you send me a photo of you?" What should you do?',
          vi: 'Một người nhắn tin với con trong game hỏi: "Gửi mình xem ảnh của bạn được không?" Con nên làm gì?'
        },
        choices: [
          {
            e: '🙅',
            en: "Don't send it, and tell a grown-up straight away",
            vi: 'Không gửi, và kể ngay với bố mẹ',
            v: 'best',
            why: {
              en: 'Photos of you are private, and someone asking for them is a reason to tell. Your grown-up will know what to do.',
              vi: 'Ảnh của con là thông tin riêng, ai xin ảnh thì con cần kể ngay. Bố mẹ sẽ biết cách xử lý.'
            }
          },
          {
            e: '📸',
            en: 'Send a nice smiley photo',
            vi: 'Gửi một tấm ảnh cười thật xinh',
            v: 'no',
            why: {
              en: "Once you send a photo, you can't get it back, and anyone could see it. Keep your photos private.",
              vi: 'Gửi ảnh đi rồi thì không lấy lại được, và ai cũng có thể xem. Hãy giữ ảnh của con cho riêng mình.'
            }
          },
          {
            e: '🐱',
            en: 'Send a photo of your cat instead',
            vi: 'Gửi ảnh con mèo thay vào đó',
            v: 'no',
            why: {
              en: 'Even a pet photo can show your home. And someone asking for photos is a reason to tell a grown-up.',
              vi: 'Ảnh thú cưng cũng có thể làm lộ nhà con. Mà ai xin ảnh thì con cần kể với bố mẹ.'
            }
          }
        ],
        lesson: {
          en: 'Never send photos of yourself to someone online. If someone asks, tell a grown-up.',
          vi: 'Không gửi ảnh của con cho người trên mạng. Ai xin ảnh, con kể ngay với bố mẹ.'
        }
      },
      {
        id: 'netfriend-says-kid',
        tier: 2,
        scene: '💬🧒❓',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '❓' }, { e: '👧', screen: true, say: { en: "I'm 7 too! Let's chat in private.", vi: 'Mình cũng 7 tuổi! Nhắn riêng đi.' } }] },
        q: {
          en: 'A player in your game says, "I\'m 7 too! Let\'s chat in private." Their picture shows a kid. What should you do?',
          vi: 'Một người chơi nhắn: "Mình cũng 7 tuổi nè! Mình nhắn riêng đi." Ảnh đại diện là một bạn nhỏ. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: "Don't chat in private. Tell a grown-up",
            vi: 'Không nhắn riêng. Kể với bố mẹ',
            v: 'best',
            why: {
              en: 'Anyone can type "I\'m 7" or use a picture of a kid. You can\'t know who they really are.',
              vi: 'Ai cũng có thể gõ "mình 7 tuổi" hay dùng ảnh một bạn nhỏ. Con không thể biết họ thật sự là ai.'
            }
          },
          {
            e: '💬',
            en: "Chat, because they're a kid just like you",
            vi: 'Nhắn tin đi, vì đó là bạn nhỏ giống con mà',
            v: 'no',
            why: {
              en: 'Online, people can pretend to be someone else. Ask your grown-up before chatting with anyone new.',
              vi: 'Trên mạng, người ta có thể giả làm người khác. Hỏi bố mẹ trước khi nói chuyện với người mới.'
            }
          },
          {
            e: '🔍',
            en: 'Ask them questions to check they are really 7',
            vi: 'Hỏi vài câu để kiểm tra xem có đúng 7 tuổi không',
            v: 'no',
            why: {
              en: "They can make up any answer, so you can't check. Your grown-up can help.",
              vi: 'Họ có thể bịa ra câu trả lời, nên con không kiểm tra được đâu. Bố mẹ sẽ giúp con.'
            }
          }
        ],
        lesson: {
          en: "People online may not be who they say they are. Don't chat in private with someone you don't know.",
          vi: 'Người trên mạng có thể không giống như họ nói. Đừng nhắn riêng với người con không quen.'
        }
      },
      {
        id: 'netfriend-meet-up',
        tier: 2,
        scene: '💬🛝📍',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '🛝❓' }, { e: '👤', screen: true, say: { en: "Let's meet at the playground!", vi: 'Mình gặp nhau ở sân chơi nhé!' } }] },
        q: {
          en: 'A friend you only know from an online game asks, "Want to meet at the playground near your home?" What should you do?',
          vi: 'Một người bạn con chỉ quen qua game rủ: "Mình gặp nhau ở sân chơi gần nhà bạn nhé?" Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Say no, and tell your grown-up right away',
            vi: 'Từ chối, và kể ngay với bố mẹ',
            v: 'best',
            why: {
              en: "You can't be sure who someone from online really is. Your grown-up needs to know they asked.",
              vi: 'Con không thể chắc người chỉ quen qua mạng thật sự là ai. Bố mẹ cần biết là có người rủ con.'
            }
          },
          {
            e: '🛝',
            en: 'Go, because you have played together lots of times',
            vi: 'Đi chứ, vì hai đứa chơi game với nhau nhiều lần rồi',
            v: 'no',
            why: {
              en: "Even if you chat a lot, you don't really know who they are. Never meet someone from online.",
              vi: 'Dù nói chuyện nhiều, con vẫn không biết họ thật sự là ai. Không bao giờ gặp người chỉ quen qua mạng.'
            }
          },
          {
            e: '📍',
            en: "Tell them which playground, but don't go",
            vi: 'Nói cho họ biết sân chơi nào, nhưng con không đi',
            v: 'no',
            why: {
              en: 'That tells them where you live. Keep places private, and tell your grown-up.',
              vi: 'Như vậy là con đã cho họ biết nhà con ở đâu. Giữ kín nơi ở và kể với bố mẹ nhé.'
            }
          }
        ],
        lesson: {
          en: 'Never meet up with someone you only know online. If anyone asks, tell your grown-up.',
          vi: 'Không bao giờ hẹn gặp người chỉ quen trên mạng. Ai rủ, con kể ngay với bố mẹ.'
        }
      },
      {
        id: 'netfriend-uh-oh-feeling',
        tier: 2,
        scene: '💬😣🛑',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '😣' }, { e: '👤', screen: true, say: { en: 'Are you home alone?', vi: 'Bạn ở nhà một mình à?' } }] },
        q: {
          en: 'Someone you chat with in a game starts asking questions that make you feel funny inside, like "Are you home alone?" What should you do?',
          vi: 'Một người nhắn tin với con trong game bắt đầu hỏi những câu làm con thấy kỳ kỳ, như "Bạn ở nhà một mình à?" Con nên làm gì?'
        },
        choices: [
          {
            e: '🛑',
            en: 'Stop chatting, close the game and tell a grown-up',
            vi: 'Thôi nhắn tin, tắt game và kể với bố mẹ',
            v: 'best',
            why: {
              en: "That funny feeling is there to help you. You won't be in trouble for telling.",
              vi: 'Cảm giác kỳ kỳ đó là để nhắc con cẩn thận. Con sẽ không bị mắng vì đã kể.'
            }
          },
          {
            e: '💬',
            en: 'Keep chatting so they are not upset',
            vi: 'Cứ nhắn tiếp cho họ khỏi buồn',
            v: 'no',
            why: {
              en: "You don't have to be polite to someone who makes you feel funny. Stop and tell a grown-up.",
              vi: 'Con không cần giữ lịch sự với người làm con thấy kỳ kỳ. Dừng lại và kể với bố mẹ.'
            }
          },
          {
            e: '🤐',
            en: 'Keep it to yourself, so you can still play the game',
            vi: 'Không kể với ai, để vẫn được chơi game',
            v: 'no',
            why: {
              en: 'Your grown-up cares about you much more than the game. Telling keeps you safe.',
              vi: 'Bố mẹ quan tâm đến con hơn trò chơi nhiều. Kể ra giúp con được an toàn.'
            }
          }
        ],
        lesson: {
          en: 'Trust your "uh-oh" feeling. If a chat makes you feel funny, stop and tell a grown-up.',
          vi: 'Hãy tin cảm giác "ơ, có gì đó không ổn". Trò chuyện nào làm con thấy kỳ kỳ, dừng lại và kể với bố mẹ.'
        }
      },
      {
        id: 'netfriend-gift-secret',
        tier: 3,
        scene: '💎🤫🎮',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '💎❓' }, { e: '👤', screen: true, say: { en: "Free gems! Don't tell your parents.", vi: 'Tặng kim cương! Đừng kể bố mẹ nhé.' } }] },
        q: {
          en: 'A player in your game says, "I\'ll give you free gems! But it\'s our secret, so don\'t tell your parents." What should you do?',
          vi: 'Một người chơi nhắn: "Mình tặng bạn kim cương miễn phí! Nhưng là bí mật nhé, đừng kể với bố mẹ." Con nên làm gì?'
        },
        choices: [
          {
            e: '🗣️',
            en: 'Say no, stop chatting, and tell your grown-up',
            vi: 'Từ chối, thôi nhắn tin, và kể với bố mẹ',
            v: 'best',
            why: {
              en: 'A gift plus "don\'t tell" is a big warning sign. Telling your grown-up is always right.',
              vi: 'Tặng quà mà dặn "đừng kể" là dấu hiệu đáng lo. Kể với bố mẹ luôn là đúng.'
            }
          },
          {
            e: '💎',
            en: 'Take the gems and keep the secret',
            vi: 'Nhận kim cương và giữ bí mật',
            v: 'no',
            why: {
              en: 'Free gifts from people online often come with tricks. Secrets that worry you should be told.',
              vi: 'Quà miễn phí từ người trên mạng thường đi kèm mẹo lừa. Bí mật làm con lo thì phải kể ra.'
            }
          },
          {
            e: '🙅',
            en: 'Say "No, thanks" and keep playing',
            vi: 'Nói "Không, cảm ơn" rồi chơi tiếp',
            v: 'ok',
            why: {
              en: 'Saying no was smart! But please tell your grown-up too, so they can block that player.',
              vi: 'Từ chối là rất khôn! Nhưng con kể với bố mẹ nữa nhé, để bố mẹ chặn người chơi đó.'
            }
          }
        ],
        lesson: {
          en: 'Someone online offers gifts and says "don\'t tell"? Say no and tell your grown-up.',
          vi: 'Ai trên mạng tặng quà rồi dặn "đừng kể"? Từ chối và kể ngay với bố mẹ.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ scary, rude or mean things / being kind
  {
    id: 'life.online-kind-brave',
    world: 'online',
    icon: '🦸',
    title: 'Kind and brave online',
    vi: 'Tử tế và dũng cảm trên mạng',
    goal: 'Con biết dừng lại, tắt đi và kể với người lớn khi gặp điều đáng sợ, khó hiểu hay bị nói lời khó nghe (con không có lỗi), và chính con cũng không gửi lời làm bạn đau.',
    talk: [
      'Nếu con thấy một video làm con sợ, con sẽ làm gì? (Bố mẹ hứa sẽ không mắng khi con kể.)',
      'Nếu có ai nhắn tin chọc ghẹo con trên mạng, con sẽ trả lời lại hay kể với bố mẹ?',
      'Trước khi gửi tin nhắn, con thử tự hỏi: "Nếu ai nói câu này với mình, mình có vui không?"'
    ],
    scenarios: [
      {
        id: 'kindnet-scary-video',
        tier: 1,
        scene: '📺😨🛑',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '😨' }, { e: '👻', screen: true }] },
        q: {
          en: 'You are watching cartoons. Suddenly, a scary video starts playing. What should you do?',
          vi: 'Con đang xem hoạt hình. Bỗng nhiên một video đáng sợ hiện ra. Con nên làm gì?'
        },
        choices: [
          {
            e: '🛑',
            en: 'Stop it, turn the iPad over, and tell a grown-up',
            vi: 'Tắt đi, úp iPad xuống và kể với người lớn',
            v: 'best',
            why: {
              en: "It's not your fault, because it just popped up. Your grown-up can help you feel better and block it.",
              vi: 'Không phải lỗi của con, nó tự hiện ra mà. Bố mẹ sẽ giúp con bớt sợ và chặn video đó.'
            }
          },
          {
            e: '👀',
            en: 'Keep watching to see what happens',
            vi: 'Xem tiếp xem chuyện gì xảy ra',
            v: 'no',
            why: {
              en: 'Scary things can stay in your head and make it hard to sleep. Stop, and tell a grown-up.',
              vi: 'Những thứ đáng sợ có thể cứ lởn vởn trong đầu, làm con khó ngủ. Dừng lại và kể với bố mẹ nhé.'
            }
          },
          {
            e: '🤐',
            en: 'Close it, but keep it to yourself',
            vi: 'Tắt đi nhưng không kể với ai',
            v: 'ok',
            why: {
              en: 'Closing it was smart! Telling a grown-up is even better, so they can stop it coming back.',
              vi: 'Tắt đi là rất đúng! Kể với bố mẹ còn tốt hơn nữa, để bố mẹ chặn nó lần sau.'
            }
          }
        ],
        lesson: {
          en: "Something scary online? Stop, close it and tell a grown-up. It's not your fault.",
          vi: 'Gặp thứ đáng sợ trên mạng? Dừng lại, tắt đi, kể với người lớn. Đó không phải lỗi của con.'
        }
      },
      {
        id: 'kindnet-cross-message',
        tier: 1,
        value: 'respect',
        scene: '😠💬✋',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '😠' }, { e: '🏆', screen: true, say: { en: '{friend} wins!', vi: '{friend} thắng!' } }] },
        q: {
          en: '{friend} won the game, and you feel cross. You want to send {friend} a mean message. What should you do?',
          vi: '{friend} thắng trò chơi và con thấy bực. Con muốn nhắn cho {friend} một câu thật khó nghe. Con nên làm gì?'
        },
        choices: [
          {
            e: '😮‍💨',
            en: "Stop, take a deep breath, and don't send it",
            vi: 'Dừng lại, hít thở sâu, và không gửi',
            v: 'best',
            why: {
              en: 'Feeling cross is OK, but mean words hurt, even on a screen. Maybe say "Good game!" instead.',
              vi: 'Bực mình là bình thường, nhưng lời khó nghe vẫn làm bạn đau, dù chỉ trên màn hình. Thử nói "Bạn chơi hay quá!" nhé.'
            }
          },
          {
            e: '📤',
            en: "Send it, because {friend} can't see your face anyway",
            vi: 'Gửi luôn, đằng nào {friend} cũng không thấy mặt mình',
            v: 'no',
            why: {
              en: "Words on a screen hurt just as much. Once a message is sent, you can't take it back.",
              vi: 'Lời trên màn hình cũng làm đau y như nói trực tiếp. Tin đã gửi đi thì không lấy lại được.'
            }
          },
          {
            e: '🙏',
            en: 'Send it now, then say sorry later',
            vi: 'Cứ gửi đi, lát nữa xin lỗi sau',
            v: 'no',
            why: {
              en: 'Saying sorry is good, but it is kinder not to send hurtful words at all.',
              vi: 'Xin lỗi là tốt, nhưng không gửi lời làm bạn đau ngay từ đầu thì tử tế hơn.'
            }
          }
        ],
        lesson: {
          en: "Before you send a message, stop and think: is it kind? If not, don't send it.",
          vi: 'Trước khi gửi tin nhắn, dừng lại nghĩ: có tử tế không? Nếu không thì đừng gửi.'
        }
      },
      {
        id: 'kindnet-tapped-by-mistake',
        tier: 2,
        scene: '👆😳🗣️',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '😳' }, { e: '❓', screen: true }] },
        q: {
          en: "You tapped something by mistake. Now there is a picture that makes you feel funny. You are scared you'll be in trouble. What should you do?",
          vi: 'Con lỡ bấm nhầm, và giờ hiện ra một hình ảnh làm con thấy kỳ kỳ. Con sợ bị mắng. Con nên làm gì?'
        },
        choices: [
          {
            e: '🗣️',
            en: 'Close it and tell a grown-up anyway',
            vi: 'Tắt đi và vẫn kể với người lớn',
            v: 'best',
            why: {
              en: "Mistakes happen, and it is not your fault. You won't be in trouble for telling.",
              vi: 'Ai cũng có lúc bấm nhầm, đó không phải lỗi của con. Con sẽ không bị mắng vì đã kể.'
            }
          },
          {
            e: '🗑️',
            en: 'Delete it quickly and say nothing',
            vi: 'Xoá thật nhanh và không nói gì',
            v: 'no',
            why: {
              en: 'Your grown-up wants to know, so they can stop it happening again. Telling is the brave thing.',
              vi: 'Bố mẹ muốn biết để giúp chuyện đó không xảy ra nữa. Kể ra mới là dũng cảm.'
            }
          },
          {
            e: '👀',
            en: 'Show {friend} to see what {friend} thinks',
            vi: 'Cho {friend} xem để hỏi ý {friend}',
            v: 'no',
            why: {
              en: '{friend} is a kid too and may feel confused. A grown-up is the right person to help.',
              vi: '{friend} cũng là trẻ con, có thể cũng thấy khó hiểu. Người lớn mới là người giúp được con.'
            }
          }
        ],
        lesson: {
          en: "Saw something that made you feel funny? Close it and tell a grown-up. You won't be in trouble.",
          vi: 'Thấy điều gì làm con thấy kỳ kỳ? Tắt đi và kể với người lớn. Con sẽ không bị mắng đâu.'
        }
      },
      {
        id: 'kindnet-friend-scary-video',
        tier: 2,
        scene: '📱😬🙅',
        pic: { bg: 'home', cast: [{ e: '🧒', you: true, think: '😬' }, { e: '🧒', say: { en: 'Look at this scary video!', vi: 'Xem video kinh dị này nè!' } }], props: ['📱'] },
        q: {
          en: 'At a playdate, {friend} says, "Look at this scary video!" You don\'t want to watch it. What can you do?',
          vi: 'Lúc sang nhà bạn chơi, {friend} nói: "Xem video kinh dị này nè!" Con không muốn xem. Con có thể làm gì?'
        },
        choices: [
          {
            e: '🙅',
            en: 'Say, "No thanks, I don\'t want to watch that," and tell a grown-up',
            vi: 'Nói: "Thôi, mình không muốn xem đâu" và kể với người lớn',
            v: 'best',
            why: {
              en: 'You can always say no to things that feel scary. A grown-up can help you both pick something else.',
              vi: 'Con luôn được từ chối điều làm con sợ. Người lớn sẽ giúp hai bạn chọn trò khác.'
            }
          },
          {
            e: '🙈',
            en: 'Close your eyes and wait until it ends',
            vi: 'Nhắm mắt chờ video hết',
            v: 'ok',
            why: {
              en: 'That helps a little, but you can use your words too! Say no, and suggest a different game.',
              vi: 'Cách đó cũng đỡ một chút, nhưng con có thể nói ra mà! Từ chối và rủ bạn chơi trò khác nhé.'
            }
          },
          {
            e: '😬',
            en: "Watch it, so {friend} doesn't think you're a baby",
            vi: 'Cứ xem để {friend} không chê mình nhát',
            v: 'no',
            why: {
              en: 'Saying no takes courage. That is brave, not babyish, and good friends understand.',
              vi: 'Dám từ chối mới là dũng cảm, không phải nhát đâu. Bạn tốt sẽ hiểu cho con.'
            }
          }
        ],
        lesson: {
          en: 'You can say no to videos that feel scary, even when a friend shows you. Then tell a grown-up.',
          vi: 'Con được từ chối xem video đáng sợ, kể cả khi bạn rủ. Sau đó hãy kể với người lớn.'
        }
      },
      {
        id: 'kindnet-mean-to-me',
        tier: 2,
        scene: '🎮💬😢',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '😢' }, { e: '👤', screen: true, say: { en: "You're so bad at this game!", vi: 'Chơi dở thế, nghỉ đi!' } }] },
        q: {
          en: 'Someone in your game keeps sending you mean messages. What should you do?',
          vi: 'Có người trong game cứ nhắn những lời khó nghe với con. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: "Don't reply. Show a grown-up, who can help block them",
            vi: 'Không trả lời. Cho bố mẹ xem, bố mẹ sẽ giúp chặn người đó',
            v: 'best',
            why: {
              en: 'Mean messages are not your fault. Your grown-up can help block and report them.',
              vi: 'Bị nhắn lời khó nghe không phải lỗi của con. Bố mẹ sẽ giúp chặn và báo cáo người đó.'
            }
          },
          {
            e: '😠',
            en: 'Send mean messages back',
            vi: 'Nhắn lại những lời khó nghe',
            v: 'no',
            why: {
              en: 'That usually makes things worse, and then two people are being mean. Get help instead.',
              vi: 'Làm vậy thường khiến mọi chuyện tệ hơn. Con hãy nhờ bố mẹ giúp nhé.'
            }
          },
          {
            e: '😢',
            en: 'Keep reading them and feel sad by yourself',
            vi: 'Cứ đọc đi đọc lại và buồn một mình',
            v: 'no',
            why: {
              en: "You don't have to deal with this alone. Telling a grown-up helps you feel better.",
              vi: 'Con không phải chịu chuyện này một mình. Kể với bố mẹ sẽ giúp con thấy nhẹ lòng hơn.'
            }
          }
        ],
        lesson: {
          en: "Someone is mean to you online? Don't reply. Show a grown-up. It's not your fault.",
          vi: 'Bị ai nói lời khó nghe trên mạng? Đừng trả lời, hãy cho bố mẹ xem. Đó không phải lỗi của con.'
        }
      },
      {
        id: 'kindnet-chain-message',
        tier: 3,
        scene: '📩🔁😟',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '😟' }, { e: '📩', screen: true, say: { en: 'Send to 10 friends or bad luck!', vi: 'Gửi cho 10 người, không thì xui!' } }] },
        q: {
          en: 'A message says, "Send this to 10 friends, or you will have bad luck!" It makes you feel worried. What should you do?',
          vi: 'Một tin nhắn viết: "Gửi tin này cho 10 người bạn, nếu không bạn sẽ gặp xui xẻo!" Con thấy lo. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: "Don't send it. Show a grown-up",
            vi: 'Không gửi. Cho bố mẹ xem',
            v: 'best',
            why: {
              en: 'Messages like this are made up. Nothing bad will happen, and your grown-up can delete it.',
              vi: 'Những tin nhắn kiểu này là bịa đặt. Sẽ không có chuyện xấu gì đâu, bố mẹ sẽ xoá nó đi.'
            }
          },
          {
            e: '📤',
            en: 'Send it to 10 friends, just in case',
            vi: 'Cứ gửi cho 10 người bạn cho chắc',
            v: 'no',
            why: {
              en: 'Then your friends get worried too. These messages are made up to spread fast, and they are not true.',
              vi: 'Như vậy các bạn cũng sẽ lo theo. Tin nhắn này được bịa ra để lan nhanh, không có thật đâu.'
            }
          },
          {
            e: '🗑️',
            en: 'Delete it and try not to think about it',
            vi: 'Xoá đi và cố không nghĩ đến',
            v: 'ok',
            why: {
              en: 'Not sending it was right! But if it still worries you, a grown-up can help you feel better.',
              vi: 'Không gửi đi là đúng! Nhưng nếu con vẫn lo, bố mẹ sẽ giúp con thấy yên tâm hơn.'
            }
          }
        ],
        lesson: {
          en: '"Send this or else…" messages are not true. Don\'t send them. Show a grown-up.',
          vi: 'Tin nhắn kiểu "gửi đi không thì…" không có thật. Đừng gửi, hãy cho bố mẹ xem.'
        }
      },
      {
        id: 'kindnet-friend-teased',
        tier: 3,
        value: 'care',
        scene: '🎮😢🤝',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '😟' }, { e: '😂', screen: true, say: { en: 'Haha, {friend} plays like a baby!', vi: 'Haha, {friend} chơi như em bé!' } }] },
        q: {
          en: 'In a game chat, some players are laughing at {friend} and calling {friend} names. What should you do?',
          vi: 'Trong nhóm chat của trò chơi, mấy người chơi đang chế giễu và gọi {friend} bằng biệt danh xấu. Con nên làm gì?'
        },
        choices: [
          {
            e: '🤝',
            en: "Don't join in. Tell a grown-up, and say something kind to {friend}",
            vi: 'Không hùa theo. Kể với người lớn và nói lời động viên {friend}',
            v: 'best',
            why: {
              en: "You can be a good friend online too. A grown-up can help stop it, and {friend} won't feel alone.",
              vi: 'Trên mạng con cũng có thể là người bạn tốt. Người lớn sẽ giúp ngăn chuyện này, và {friend} sẽ không thấy cô đơn.'
            }
          },
          {
            e: '😂',
            en: "Laugh along, so they don't pick on you next",
            vi: 'Cười theo cho họ khỏi chọc mình',
            v: 'no',
            why: {
              en: 'Joining in hurts {friend} even more. Being kind takes courage, and a grown-up can help.',
              vi: 'Hùa theo chỉ làm {friend} buồn hơn. Tử tế cần dũng cảm, và người lớn sẽ giúp con.'
            }
          },
          {
            e: '🚪',
            en: 'Leave the chat and do nothing',
            vi: 'Thoát khỏi nhóm chat và không làm gì',
            v: 'ok',
            why: {
              en: 'Not joining in was right! But {friend} still needs help, so tell a grown-up and check on {friend}.',
              vi: 'Không hùa theo là đúng! Nhưng {friend} vẫn cần giúp, nên con kể với người lớn và hỏi thăm {friend} nhé.'
            }
          }
        ],
        lesson: {
          en: "If someone is mean to a friend online, don't join in. Tell a grown-up and be kind to your friend.",
          vi: 'Thấy bạn bị chọc ghẹo trên mạng? Không hùa theo, kể với người lớn và an ủi bạn.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ ads, downloads, purchases
  {
    id: 'life.ask-before-tap',
    world: 'online',
    icon: '👆',
    title: 'Ask before you tap',
    vi: 'Hỏi trước khi bấm',
    goal: 'Con biết luôn hỏi bố mẹ trước khi tải ứng dụng, bấm quảng cáo, mua đồ trong game, hay bấm vào thông báo "trúng thưởng", "nhiễm virus".',
    talk: [
      'Vì sao trên mạng hay có thông báo "Bạn đã trúng thưởng!"? Mình cùng tìm hiểu nhé.',
      'Kim cương, xu trong game có phải là đồ miễn phí không? Ai trả tiền?',
      'Nếu con lỡ bấm mua nhầm, con sẽ làm gì?'
    ],
    scenarios: [
      {
        id: 'asktap-buy-gems',
        tier: 1,
        scene: '🎮💎💳',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '💎' }, { e: '💎', screen: true, say: { en: 'Get 500 gems! Tap BUY', vi: 'Mua 500 kim cương! Bấm MUA' } }] },
        q: {
          en: 'Your game says, "Get 500 gems now! Tap BUY." You really want them. What should you do?',
          vi: 'Trò chơi hiện chữ: "Mua 500 kim cương ngay! Bấm MUA." Con rất muốn có. Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Ask your grown-up first',
            vi: 'Hỏi bố mẹ trước',
            v: 'best',
            why: {
              en: 'Gems cost real money from your family. Your grown-up decides what to buy.',
              vi: 'Kim cương phải trả bằng tiền thật của gia đình. Bố mẹ sẽ quyết định có mua hay không.'
            }
          },
          {
            e: '👆',
            en: "Tap BUY, because it's only a game",
            vi: 'Bấm MUA thôi, chỉ là game mà',
            v: 'no',
            why: {
              en: "Game things cost real money, even when it doesn't look like it. Always ask before you buy.",
              vi: 'Đồ trong game tốn tiền thật, dù nhìn không giống. Luôn hỏi bố mẹ trước khi mua.'
            }
          },
          {
            e: '🤫',
            en: 'Tap BUY while nobody is looking',
            vi: 'Bấm MUA lúc không ai để ý',
            v: 'no',
            why: {
              en: "Buying in secret isn't honest, and it uses your family's money. Ask, even if the answer might be no.",
              vi: 'Lén mua là không trung thực, lại tiêu tiền của gia đình. Hãy hỏi, dù bố mẹ có thể nói không.'
            }
          }
        ],
        lesson: {
          en: 'Gems, coins and extras in games cost real money. Always ask your grown-up before you buy.',
          vi: 'Kim cương, xu và đồ trong game đều tốn tiền thật. Luôn hỏi bố mẹ trước khi mua.'
        }
      },
      {
        id: 'asktap-free-download',
        tier: 1,
        scene: '📲🎮❓',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '🎮' }, { e: '📲', screen: true, say: { en: 'New game! Download FREE!', vi: 'Game mới! Tải MIỄN PHÍ!' } }] },
        q: {
          en: 'You see an ad for a new game. It says, "Download now. It\'s FREE!" What should you do?',
          vi: 'Con thấy quảng cáo một trò chơi mới: "Tải ngay, MIỄN PHÍ!" Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Ask your grown-up before downloading',
            vi: 'Hỏi bố mẹ trước khi tải',
            v: 'best',
            why: {
              en: 'Your grown-up can check if the game is right for your age and safe to download.',
              vi: 'Bố mẹ sẽ xem trò chơi có hợp tuổi con và có an toàn để tải không.'
            }
          },
          {
            e: '📲',
            en: "Download it, because it's free!",
            vi: 'Tải luôn, vì miễn phí mà!',
            v: 'no',
            why: {
              en: '"Free" games can still have ads, chats with strangers, or things to buy. Ask your grown-up first.',
              vi: 'Game "miễn phí" vẫn có thể có quảng cáo, trò chuyện với người lạ hay đồ phải mua. Hỏi bố mẹ trước nhé.'
            }
          },
          {
            e: '👆',
            en: 'Tap the ad to see more',
            vi: 'Bấm vào quảng cáo xem thử',
            v: 'no',
            why: {
              en: "Ads can take you to places that aren't for children. Ask a grown-up before you tap.",
              vi: 'Quảng cáo có thể dẫn con đến những trang không dành cho trẻ em. Hỏi bố mẹ trước khi bấm nhé.'
            }
          }
        ],
        lesson: {
          en: 'Ask your grown-up before you download an app or tap an ad, even if it says FREE.',
          vi: 'Hỏi bố mẹ trước khi tải ứng dụng hay bấm vào quảng cáo, dù có ghi MIỄN PHÍ.'
        }
      },
      {
        id: 'asktap-prize-popup',
        tier: 2,
        scene: '📱🎉🎁',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '🎁❓' }, { e: '🎉', screen: true, say: { en: 'You won a prize! Tap here!', vi: 'Bạn trúng thưởng! Bấm vào đây!' } }] },
        q: {
          en: 'A big pop-up flashes: "You won a prize! Tap here now!" What should you do?',
          vi: 'Một thông báo nhấp nháy hiện lên: "Bạn đã trúng thưởng! Bấm vào đây ngay!" Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: "Don't tap it. Show a grown-up",
            vi: 'Không bấm. Cho bố mẹ xem',
            v: 'best',
            why: {
              en: '"You won!" pop-ups are tricks to make you tap. A grown-up can close it safely.',
              vi: 'Thông báo "trúng thưởng" là mẹo để dụ con bấm vào. Bố mẹ sẽ tắt nó an toàn.'
            }
          },
          {
            e: '👆',
            en: 'Tap it fast, before the prize is gone',
            vi: 'Bấm thật nhanh kẻo hết quà',
            v: 'no',
            why: {
              en: '"Hurry!" is part of the trick. Real prizes don\'t pop up out of nowhere.',
              vi: '"Nhanh lên!" cũng là một phần của mẹo lừa. Quà thật không tự nhiên hiện ra đâu.'
            }
          },
          {
            e: '❌',
            en: 'Look for the X and close it yourself',
            vi: 'Tìm dấu X để tự tắt',
            v: 'ok',
            why: {
              en: 'Not tapping the prize was smart! But some X buttons are tricks too, so ask a grown-up to close it.',
              vi: 'Không bấm vào quà là khôn! Nhưng có dấu X cũng là mẹo lừa, nên hãy nhờ bố mẹ tắt giúp.'
            }
          }
        ],
        lesson: {
          en: '"You won a prize!" pop-ups are tricks. Don\'t tap. Show a grown-up.',
          vi: 'Thông báo "Bạn trúng thưởng!" là mẹo lừa. Đừng bấm, hãy cho bố mẹ xem.'
        }
      },
      {
        id: 'asktap-oops-bought',
        tier: 2,
        value: 'integrity',
        scene: '😮🧾💎',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '😮' }, { e: '🧾', screen: true, say: { en: 'Thank you for buying!', vi: 'Cảm ơn bạn đã mua hàng!' } }] },
        q: {
          en: 'Oops! You tapped a button in your game, and it said "Thank you for buying!" Now you feel scared. What should you do?',
          vi: 'Ối! Con lỡ bấm một nút trong game và hiện chữ "Cảm ơn bạn đã mua hàng!" Con thấy sợ. Con nên làm gì?'
        },
        choices: [
          {
            e: '🗣️',
            en: 'Tell your grown-up straight away',
            vi: 'Kể ngay với bố mẹ',
            v: 'best',
            why: {
              en: 'Mistakes happen. If you tell quickly, a grown-up can often fix it. Thank you for being honest!',
              vi: 'Ai cũng có lúc nhầm. Kể sớm thì bố mẹ thường có thể xử lý được. Cảm ơn con đã trung thực!'
            }
          },
          {
            e: '🤫',
            en: 'Close the game and hope nobody finds out',
            vi: 'Tắt game và mong không ai biết',
            v: 'no',
            why: {
              en: 'Your grown-up will find out later, and then it is harder to fix. Telling is brave and honest.',
              vi: 'Sau này bố mẹ cũng sẽ biết, lúc đó lại khó xử lý hơn. Kể ra là dũng cảm và trung thực.'
            }
          },
          {
            e: '👆',
            en: 'Keep tapping buttons to try to undo it',
            vi: 'Bấm thêm mấy nút nữa để thử hoàn lại',
            v: 'no',
            why: {
              en: 'More tapping might buy more things by mistake. Stop and get a grown-up.',
              vi: 'Bấm thêm có thể lỡ mua thêm nữa. Dừng lại và gọi bố mẹ nhé.'
            }
          }
        ],
        lesson: {
          en: 'Made a mistake on the iPad? Stop and tell your grown-up quickly. Telling the truth is always right.',
          vi: 'Lỡ bấm nhầm trên iPad? Dừng lại và kể ngay với bố mẹ. Nói thật luôn là lựa chọn đúng.'
        }
      },
      {
        id: 'asktap-app-permission',
        tier: 3,
        scene: '📱📷📍',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '❓' }, { e: '📍', screen: true, say: { en: 'Allow camera and location?', vi: 'Cho dùng máy ảnh và vị trí?' } }] },
        q: {
          en: 'A new app asks, "Allow this app to use your camera and see where you are?" What should you do?',
          vi: 'Một ứng dụng mới hỏi: "Cho phép ứng dụng dùng máy ảnh và biết vị trí của bạn?" Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: 'Ask a grown-up to read it and decide',
            vi: 'Nhờ bố mẹ đọc và quyết định',
            v: 'best',
            why: {
              en: 'What your camera sees and where you are is private. A grown-up can choose what is safe.',
              vi: 'Máy ảnh và vị trí của con là chuyện riêng tư. Bố mẹ sẽ chọn cách an toàn.'
            }
          },
          {
            e: '✅',
            en: 'Tap "Allow" so the box goes away',
            vi: 'Bấm "Cho phép" cho nó biến mất',
            v: 'no',
            why: {
              en: '"Allow" lets the app see private things, like where you are. Ask first.',
              vi: 'Bấm "Cho phép" là để ứng dụng thấy những thứ riêng tư, như con đang ở đâu. Hỏi bố mẹ trước nhé.'
            }
          },
          {
            e: '🚫',
            en: 'Tap "Don\'t Allow"',
            vi: 'Bấm "Không cho phép"',
            v: 'ok',
            why: {
              en: 'That keeps things private! But some apps need it to work, so it is best to let your grown-up decide.',
              vi: 'Như vậy giữ được riêng tư! Nhưng có ứng dụng cần quyền này mới chạy được, nên để bố mẹ quyết định.'
            }
          }
        ],
        lesson: {
          en: 'If an app asks to use your camera, microphone or location, ask your grown-up first.',
          vi: 'Ứng dụng xin dùng máy ảnh, micro hay vị trí? Hỏi bố mẹ trước nhé.'
        }
      },
      {
        id: 'asktap-virus-popup',
        tier: 3,
        scene: '📱⚠️😨',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '😨' }, { e: '⚠️', screen: true, say: { en: 'Virus! Tap here to fix it!', vi: 'Có virus! Bấm vào đây để sửa!' } }] },
        q: {
          en: 'A message pops up: "WARNING! Your iPad has a virus! Tap here to fix it now!" What should you do?',
          vi: 'Một thông báo hiện lên: "CẢNH BÁO! iPad của bạn bị nhiễm virus! Bấm vào đây để sửa ngay!" Con nên làm gì?'
        },
        choices: [
          {
            e: '🙋',
            en: "Don't tap. Show a grown-up",
            vi: 'Không bấm. Cho bố mẹ xem',
            v: 'best',
            why: {
              en: 'Scary pop-ups are a trick to make you tap without thinking. Your iPad is most likely fine.',
              vi: 'Thông báo doạ dẫm là mẹo để con bấm mà không kịp nghĩ. iPad của con nhiều khả năng vẫn ổn.'
            }
          },
          {
            e: '👆',
            en: 'Tap "Fix it" quickly to save the iPad',
            vi: 'Bấm "Sửa ngay" để cứu iPad',
            v: 'no',
            why: {
              en: 'The "Fix it" button is the trick! It could put bad things on the iPad. Ask a grown-up instead.',
              vi: 'Nút "Sửa ngay" chính là mẹo lừa! Nó có thể cài thứ không tốt vào iPad. Hãy hỏi bố mẹ.'
            }
          },
          {
            e: '🙈',
            en: 'Turn the iPad off and hide it',
            vi: 'Tắt iPad rồi giấu đi',
            v: 'no',
            why: {
              en: "Hiding it won't help, and you are not in trouble. Your grown-up can check that the iPad is OK.",
              vi: 'Giấu đi không giúp được gì, và con không có lỗi đâu. Bố mẹ sẽ kiểm tra xem iPad có ổn không.'
            }
          }
        ],
        lesson: {
          en: "Pop-ups that try to scare or rush you are tricks. Don't tap. Show a grown-up.",
          vi: 'Thông báo doạ dẫm hay giục giã là mẹo lừa. Đừng bấm, hãy cho bố mẹ xem.'
        }
      }
    ]
  },

  // ------------------------------------------------------------------ screen time
  {
    id: 'life.screen-timer',
    world: 'online',
    icon: '⏰',
    title: 'When screen time ends',
    vi: 'Khi hết giờ dùng máy',
    goal: 'Con biết vui vẻ tắt máy khi hết giờ, không dùng màn hình trong bữa ăn và trước giờ ngủ, cho mắt nghỉ ngơi và dành thời gian chơi ngoài trời.',
    talk: [
      'Khi chuông hẹn giờ reo, con có thể làm gì để tắt máy dễ dàng hơn?',
      'Ngoài iPad, con thích chơi những trò gì nhất? Mình cùng viết một danh sách nhé.',
      'Vì sao nhà mình không xem điện thoại, iPad trong bữa ăn và trước khi đi ngủ?'
    ],
    scenarios: [
      {
        id: 'screentime-timer-rings',
        tier: 1,
        value: 'responsibility',
        scene: '⏰📱🎮',
        pic: { bg: 'tablet', cast: [{ e: '⏰', size: 's', x: 10, say: { en: 'Ring ring! Time is up!', vi: 'Reng reng! Hết giờ rồi!' } }, { e: '🧒', you: true, x: 34, think: '😣' }, { e: '🎮', screen: true }] },
        q: {
          en: 'The timer rings: screen time is over! But you are in the middle of a game. What should you do?',
          vi: 'Chuông hẹn giờ reo: hết giờ dùng máy rồi! Nhưng con đang chơi dở. Con nên làm gì?'
        },
        choices: [
          {
            e: '👍',
            en: 'Say "OK", turn it off and hand it back',
            vi: 'Nói "Dạ", tắt máy và đưa lại cho bố mẹ',
            v: 'best',
            why: {
              en: 'Stopping without a fuss shows your grown-up they can trust you with screen time next time.',
              vi: 'Tắt máy đúng giờ, không cáu kỉnh, bố mẹ sẽ tin con cho những lần sau.'
            }
          },
          {
            e: '🙏',
            en: 'Ask nicely, "Can I save my game first?"',
            vi: 'Lễ phép hỏi: "Con lưu game lại trước được không ạ?"',
            v: 'ok',
            why: {
              en: 'Asking nicely is good! Keep it quick, and if the answer is no, turn it off with a smile.',
              vi: 'Lễ phép hỏi là tốt! Nhưng làm thật nhanh, và nếu bố mẹ bảo không thì con vui vẻ tắt máy nhé.'
            }
          },
          {
            e: '😭',
            en: 'Cry and shout, "Just five more minutes!"',
            vi: 'Khóc và la: "Thêm năm phút nữa thôi!"',
            v: 'no',
            why: {
              en: "It's OK to feel sad when fun stops. Take a deep breath, then turn it off. There's more fun next time.",
              vi: 'Buồn khi hết giờ chơi là bình thường. Con hít thở sâu rồi tắt máy, lần sau lại chơi tiếp.'
            }
          },
          {
            e: '🙈',
            en: 'Hide somewhere and keep playing',
            vi: 'Trốn đi chỗ khác chơi tiếp',
            v: 'no',
            why: {
              en: "Sneaking extra time isn't honest, and your grown-up would feel let down. When time is up, it's up.",
              vi: 'Lén chơi thêm là không trung thực, bố mẹ sẽ buồn lắm. Hết giờ là hết giờ con nhé.'
            }
          }
        ],
        lesson: {
          en: "When the timer rings, screen time ends. Turn it off without a fuss. There's always next time!",
          vi: 'Chuông reo là hết giờ. Con vui vẻ tắt máy, lần sau lại chơi tiếp!'
        }
      },
      {
        id: 'screentime-bedtime',
        tier: 1,
        scene: '🛏️📱🌙',
        pic: { bg: 'bedroom', cast: [{ e: '🧒', you: true, think: '📱' }], props: ['📱', '🧸'] },
        q: {
          en: "It's bedtime. You want to take the iPad to bed and watch one more video. What should you do?",
          vi: 'Đến giờ đi ngủ rồi. Con muốn mang iPad lên giường xem thêm một video. Con nên làm gì?'
        },
        choices: [
          {
            e: '📚',
            en: 'Leave the iPad outside the bedroom and read a book instead',
            vi: 'Để iPad ngoài phòng ngủ và đọc sách',
            v: 'best',
            why: {
              en: 'Screens before bed make it harder to fall asleep. A story helps your body get ready for sleep.',
              vi: 'Xem màn hình trước khi ngủ làm con khó ngủ hơn. Đọc truyện giúp cơ thể con sẵn sàng đi ngủ.'
            }
          },
          {
            e: '📱',
            en: 'Watch under the blanket so nobody sees',
            vi: 'Trùm chăn xem lén để không ai thấy',
            v: 'no',
            why: {
              en: "The bright screen keeps your brain awake, so tomorrow you'll feel tired. Screens sleep outside the bedroom.",
              vi: 'Màn hình sáng làm đầu óc con tỉnh táo, mai con sẽ mệt. Hãy cho iPad "ngủ" ngoài phòng nhé.'
            }
          },
          {
            e: '⏱️',
            en: 'Watch just one short video, then sleep',
            vi: 'Xem một video ngắn thôi rồi ngủ',
            v: 'no',
            why: {
              en: 'One video often turns into more, and screens make sleep harder. Save it for tomorrow!',
              vi: 'Một video thường thành nhiều video, mà màn hình làm con khó ngủ. Để mai xem nhé!'
            }
          }
        ],
        lesson: {
          en: 'No screens at bedtime. Books and cuddles help you sleep well.',
          vi: 'Giờ đi ngủ thì không dùng màn hình. Đọc sách, ôm bố mẹ giúp con ngủ ngon.'
        }
      },
      {
        id: 'screentime-mealtime',
        tier: 1,
        scene: '🍽️📱👪',
        pic: { bg: 'home', cast: [{ e: '👩', size: 'l' }, { e: '🧒', you: true, think: '📱' }, { e: '👨', size: 'l' }], props: ['🍚', '🥢', '📱'] },
        q: {
          en: "It's dinner time with the family. You want to watch videos while you eat. What should you do?",
          vi: 'Đến giờ cả nhà ăn tối. Con muốn vừa ăn vừa xem video. Con nên làm gì?'
        },
        choices: [
          {
            e: '🍽️',
            en: 'Put the screen away and chat with your family',
            vi: 'Cất máy đi và trò chuyện với cả nhà',
            v: 'best',
            why: {
              en: 'Mealtimes are for eating and talking together. You can tell everyone about your day!',
              vi: 'Bữa ăn là lúc cả nhà cùng ăn và nói chuyện. Con có thể kể về một ngày của con!'
            }
          },
          {
            e: '📱',
            en: 'Prop the iPad up and watch while you eat',
            vi: 'Dựng iPad lên vừa ăn vừa xem',
            v: 'no',
            why: {
              en: "With a screen, you don't notice your food or your family. Screens can wait until after.",
              vi: 'Mải xem thì con không để ý đến món ăn và mọi người. Màn hình đợi sau bữa ăn nhé.'
            }
          },
          {
            e: '⚡',
            en: 'Eat super fast to get back to the iPad',
            vi: 'Ăn thật nhanh để quay lại với iPad',
            v: 'no',
            why: {
              en: 'Gulping food is not good for your tummy, and you miss family time. Enjoy your meal.',
              vi: 'Ăn vội không tốt cho bụng, mà con lại bỏ lỡ lúc vui bên gia đình. Con cứ thong thả ăn nhé.'
            }
          }
        ],
        lesson: {
          en: 'No screens at mealtimes. Eat, talk and enjoy time with your family.',
          vi: 'Không dùng màn hình trong bữa ăn. Cùng ăn, cùng trò chuyện với cả nhà.'
        }
      },
      {
        id: 'screentime-play-outside',
        tier: 2,
        scene: '☀️🛝📱',
        pic: { bg: 'door', cast: [{ e: '🧒', you: true, think: '📱' }, { e: '🧒', say: { en: 'Come and play outside!', vi: 'Ra sân chơi đi!' } }], props: ['⚽'] },
        q: {
          en: "It's a sunny afternoon. {friend} knocks and asks you to play at the playground, but you are watching videos. What should you do?",
          vi: 'Một buổi chiều đầy nắng. {friend} gõ cửa rủ con ra sân chơi, nhưng con đang xem video. Con nên làm gì?'
        },
        choices: [
          {
            e: '🛝',
            en: 'Turn off the video and go out to play, once your grown-up says OK',
            vi: 'Tắt video và ra ngoài chơi, khi bố mẹ đồng ý',
            v: 'best',
            why: {
              en: 'Running and playing outside is great for your body, your eyes and your friendships.',
              vi: 'Chạy nhảy ngoài trời rất tốt cho cơ thể, cho mắt và cho tình bạn.'
            }
          },
          {
            e: '📱',
            en: 'Say "Later!" and keep watching',
            vi: 'Nói "Để lát nữa!" rồi xem tiếp',
            v: 'no',
            why: {
              en: '{friend} might feel sad, and the videos will still be there later. Playtime with friends is special.',
              vi: '{friend} có thể thấy buồn, mà video thì lúc nào cũng còn. Được chơi với bạn mới là quý.'
            }
          },
          {
            e: '🏠',
            en: 'Ask {friend} to come in and watch videos with you',
            vi: 'Rủ {friend} vào nhà cùng xem video',
            v: 'ok',
            why: {
              en: 'Sharing is kind! But playing outside together is even better for both of you.',
              vi: 'Rủ bạn cùng xem là tốt bụng! Nhưng hai bạn cùng ra ngoài chơi thì còn tốt hơn nữa.'
            }
          }
        ],
        lesson: {
          en: 'Balance your day: play outside, move your body, and keep screen time short.',
          vi: 'Cân bằng một ngày: chơi ngoài trời, vận động nhiều, và dùng màn hình ít thôi.'
        }
      },
      {
        id: 'screentime-tired-eyes',
        tier: 2,
        scene: '📱👀🥱',
        pic: { bg: 'tablet', cast: [{ e: '🧒', you: true, x: 25, think: '🥱' }, { e: '🎬', screen: true }] },
        q: {
          en: 'You have been on the iPad for a long time. Your eyes feel tired and your head feels heavy. What should you do?',
          vi: 'Con dùng iPad lâu quá rồi. Mắt con mỏi và đầu thấy nặng nặng. Con nên làm gì?'
        },
        choices: [
          {
            e: '🌳',
            en: 'Stop, look at something far away, and go and play',
            vi: 'Dừng lại, nhìn ra xa một lúc rồi đi chơi',
            v: 'best',
            why: {
              en: 'Your eyes need a rest. Looking far away and playing outside are good for your eyes.',
              vi: 'Mắt con cần nghỉ ngơi. Nhìn ra xa và chơi ngoài trời rất tốt cho mắt.'
            }
          },
          {
            e: '🔍',
            en: 'Hold the iPad closer so it is easier to see',
            vi: 'Cầm iPad sát mắt hơn cho dễ nhìn',
            v: 'no',
            why: {
              en: 'Holding a screen close makes your eyes work even harder. Take a break instead.',
              vi: 'Để màn hình sát mắt làm mắt con càng mệt hơn. Con nghỉ một chút nhé.'
            }
          },
          {
            e: '😣',
            en: 'Rub your eyes and keep playing',
            vi: 'Dụi mắt rồi chơi tiếp',
            v: 'no',
            why: {
              en: 'Tired eyes are telling you to stop. Take a break, and tell a grown-up if your head still hurts.',
              vi: 'Mắt mỏi là đang nhắc con dừng lại. Nghỉ một lúc, và kể với bố mẹ nếu vẫn còn nhức đầu.'
            }
          }
        ],
        lesson: {
          en: 'Tired eyes need a break. Look far away, play outside, and take breaks from screens.',
          vi: 'Mắt mỏi là cần nghỉ. Nhìn ra xa, chơi ngoài trời và nghỉ giải lao khi dùng màn hình.'
        }
      },
      {
        id: 'screentime-family-rules',
        tier: 3,
        value: 'respect',
        scene: '🏫🎮⏰',
        pic: { bg: 'schoolyard', cast: [{ e: '🧒', you: true, think: '🤔' }, { e: '🧒', say: { en: 'I can play games all day!', vi: 'Mình được chơi game cả ngày!' } }] },
        q: {
          en: 'At recess, {friend} says, "I can play games all day at home!" Your family has a screen-time timer. What do you think?',
          vi: 'Giờ ra chơi, {friend} khoe: "Ở nhà mình được chơi game cả ngày!" Nhà con có hẹn giờ dùng máy. Con nghĩ sao?'
        },
        choices: [
          {
            e: '🏠',
            en: 'Every family has its own rules, and mine help me stay healthy',
            vi: 'Mỗi nhà có quy định riêng, quy định nhà mình giúp mình khoẻ mạnh',
            v: 'best',
            why: {
              en: "Families are different, and that's OK. Your grown-up makes rules with love, to keep you healthy.",
              vi: 'Mỗi gia đình mỗi khác, điều đó bình thường. Bố mẹ đặt quy định vì thương con, để con khoẻ mạnh.'
            }
          },
          {
            e: '😠',
            en: "It's not fair! I'll refuse to stop when the timer rings",
            vi: 'Không công bằng! Chuông reo mình sẽ không chịu tắt',
            v: 'no',
            why: {
              en: 'Feeling it is unfair is OK, and you can talk about it calmly. But a rule is still a rule.',
              vi: 'Thấy không công bằng cũng là bình thường, con có thể nhẹ nhàng nói với bố mẹ. Nhưng quy định vẫn là quy định.'
            }
          },
          {
            e: '🤥',
            en: 'Tell {friend}, "Me too! I can play all day too!"',
            vi: 'Nói với {friend}: "Mình cũng được chơi cả ngày!"',
            v: 'no',
            why: {
              en: 'A fib to fit in doesn\'t feel good inside. It\'s OK to say, "My family has a timer."',
              vi: 'Nói dối cho giống bạn thì trong lòng chẳng vui đâu. Con cứ nói: "Nhà mình có hẹn giờ."'
            }
          }
        ],
        lesson: {
          en: 'Every family has its own screen rules. Follow yours, and talk about them kindly if you disagree.',
          vi: 'Mỗi nhà có quy định riêng về màn hình. Con làm theo quy định nhà mình, và nhẹ nhàng trao đổi nếu chưa đồng ý.'
        }
      }
    ]
  }
];
