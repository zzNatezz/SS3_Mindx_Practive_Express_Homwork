const users = [
    {
        id: "9fceb585-042f-4f10-9cb5-37c529d93166",
        userName: "Nobita",
        email: "nobita@japanese.com",
        age: 5,
        avatar: "https://i.kym-cdn.com/photos/images/original/000/985/256/d51.png"
    },
    {
        id: "6257644e-94f2-45fc-9803-fc862df55eaa",
        userName: "Doraemon",
        email: "doraemon@nobita.com",
        avatar: "https://i.pinimg.com/736x/11/e4/4d/11e44d85743b28fa62121b5ae71a914b.jpg"
    },
    {
        id: "e7a88219-c265-44b4-ba02-1d2571ee4173",
        userName: "Suneo",
        email: "suneo@jaien.com",
        avatar: "https://ecdn.game4v.com/g4v-content/uploads/2023/05/19100155/Suneo-2-game4v-1684465314-94.jpg"
    }
];

const posts = [
    {
      userId: '9fceb585-042f-4f10-9cb5-37c529d93166',
      postId: 'd051b29e-d9c5-4cb1-89bf-38b31aef05f1',
      content: 'Chào mọi người!',
      createdAt: '2023-09-22T12:30:00.000Z',
      isPublic: true
    },
    {
      userId: '9fceb585-042f-4f10-9cb5-37c529d93166',
      postId: 'cfcc73cd-5297-48a4-8d3a-2282a30a8c7a',
      content: 'Tôi đã tìm thấy một quyển sách tuyệt vời để đọc.',
      createdAt: '2023-09-22T12:31:00.000Z',
      isPublic: false
    },
    {
      userId: '9fceb585-042f-4f10-9cb5-37c529d93166',
      postId: '86c961d8-0edc-4c59-a048-3f192a0e7ea3',
      content: 'Hôm nay thời tiết tuyệt vời!',
      createdAt: '2023-09-22T12:32:00.000Z',
      isPublic: true
    },
    {
      userId: '9fceb585-042f-4f10-9cb5-37c529d93166',
      postId: 'e12a04e0-6b3b-4d6a-9f2d-60ebd21dbf3d',
      content: 'Cuối tuần tới, tôi sẽ tham gia một sự kiện thú vị.',
      createdAt: '2023-09-22T12:33:00.000Z',
      isPublic: false
    },
    {
      userId: '9fceb585-042f-4f10-9cb5-37c529d93166',
      postId: '40b8d24e-70a5-4f75-8f71-0905b8e197cf',
      content: 'Yêu mọi người!',
      createdAt: '2023-09-22T12:34:00.000Z',
      isPublic: true
    },
    {
      userId: '9fceb585-042f-4f10-9cb5-37c529d93166',
      postId: '3b8d6e1a-7601-43c3-9264-1f3653a1e5c9',
      content: 'Chúc mọi người cuối tuần vui vẻ!',
      createdAt: '2023-09-22T12:35:00.000Z',
      isPublic: true
    },
    {
      userId: '9fceb585-042f-4f10-9cb5-37c529d93166',
      postId: '5f508d8e-407b-4b41-8ff2-e727590aaf5d',
      content: 'Làm điều tốt cho ngày hôm nay!',
      createdAt: '2023-09-22T12:36:00.000Z',
      isPublic: true
    },
    {
      userId: '9fceb585-042f-4f10-9cb5-37c529d93166',
      postId: '1d8b6e16-c01a-4c80-8924-2bf9f5a548cc',
      content: 'Chia sẻ niềm vui!',
      createdAt: '2023-09-22T12:37:00.000Z',
      isPublic: true
    },
    {
      userId: '9fceb585-042f-4f10-9cb5-37c529d93166',
      postId: '1b2b8c16-32ca-4e5a-9866-9df098c5e144',
      content: 'Hãy yêu đến mức bạn có thể!',
      createdAt: '2023-09-22T12:38:00.000Z',
      isPublic: true
    },
    {
      userId: '9fceb585-042f-4f10-9cb5-37c529d93166',
      postId: '4e5c8d1f-30a8-4d88-832e-79fb6d6a2cf1',
      content: 'Hãy sống với niềm đam mê!',
      createdAt: '2023-09-22T12:39:00.000Z',
      isPublic: true
    },
    {
      userId: '6257644e-94f2-45fc-9803-fc862df55eaa',
      postId: 'a1d6d08c-356e-4f0e-8521-dc20ef12e882',
      content: 'Hôm nay là một ngày đáng nhớ!',
      createdAt: '2023-09-22T14:30:00.000Z',
      isPublic: true
    },
    {
      userId: '6257644e-94f2-45fc-9803-fc862df55eaa',
      postId: '4b721d1f-99b9-4e4e-90d5-ef06dca0b99e',
      content: 'Chúc mọi người một ngày thật tươi đẹp!',
      createdAt: '2023-09-22T14:31:00.000Z',
      isPublic: false
    },
    {
      userId: '6257644e-94f2-45fc-9803-fc862df55eaa',
      postId: 'd5e68c5a-50cd-4889-8a59-2b6be7d00aa3',
      content: 'Hãy luôn giữ nụ cười trên môi!',
      createdAt: '2023-09-22T14:32:00.000Z',
      isPublic: true
    },
    {
      userId: '6257644e-94f2-45fc-9803-fc862df55eaa',
      postId: '32c8b9d3-5ecf-4a76-ba33-12f120ea2fb1',
      content: 'Tôi đang học một điều mới mẻ hôm nay.',
      createdAt: '2023-09-22T14:33:00.000Z',
      isPublic: false
    },
    {
      userId: '6257644e-94f2-45fc-9803-fc862df55eaa',
      postId: 'e8c5d7b6-2b2a-4d68-a067-9cd0ec191f7a',
      content: 'Yêu cuộc sống!',
      createdAt: '2023-09-22T14:34:00.000Z',
      isPublic: true
    },
    {
      userId: '6257644e-94f2-45fc-9803-fc862df55eaa',
      postId: 'f3e8d6a1-36b1-4e15-9a25-7d98b4a4fece',
      content: 'Nhớ người thân và bạn bè!',
      createdAt: '2023-09-22T14:35:00.000Z',
      isPublic: true
    },
    {
      userId: '6257644e-94f2-45fc-9803-fc862df55eaa',
      postId: '17b2c3d4-97d0-43ef-9c5e-bc63dabf1a1f',
      content: 'Hãy làm điều tốt trong ngày hôm nay!',
      createdAt: '2023-09-22T14:36:00.000Z',
      isPublic: true
    },
    {
      userId: '6257644e-94f2-45fc-9803-fc862df55eaa',
      postId: 'a9d8b2e1-2dcb-42a6-85c8-eb891d8b49f2',
      content: 'Chúc mọi người một cuối tuần vui vẻ!',
      createdAt: '2023-09-22T14:37:00.000Z',
      isPublic: true
    },
    {
      userId: '6257644e-94f2-45fc-9803-fc862df55eaa',
      postId: 'c6e9a8f1-9013-4e8b-8f63-4f1a9a667c5f',
      content: 'Luôn học hỏi và phát triển bản thân!',
      createdAt: '2023-09-22T14:38:00.000Z',
      isPublic: true
    },
    {
      userId: '6257644e-94f2-45fc-9803-fc862df55eaa',
      postId: 'b1e3d9c8-6d97-4e86-94fc-7bcda8a1e0bd',
      content: 'Yêu mọi người từ trái tim!',
      createdAt: '2023-09-22T14:39:00.000Z',
      isPublic: true
    }
  ]
  export {
    users, 
    posts
  }