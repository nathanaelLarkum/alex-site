export type Language = "en" | "pt"

export const dictionary = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      gallery: "Gallery",
      contact: "Contact",
    },
    home: {
      heroTitleLine1: "Where Art",
      heroTitleLine2: "Meets Vision",
      heroSubtitle:
        "Contemporary work exploring the boundaries between color, form, and emotion.",
      viewGallery: "View Gallery",
      learnMore: "Learn More",
      aboutLabel: "About the Artist",
      aboutHeading: "Fingertips",
      aboutBody: "[PLACEHOLDER — artist bio coming soon]",
      aboutPhotoAlt: "Portrait of the artist",
      contactLabel: "Get in Touch",
      contactHeading: "Commission a Piece",
      contactBody:
        "Interested in acquiring a piece or commissioning original work? Reach out to discuss your vision.",
      formName: "Name",
      formEmail: "Email",
      formMessage: "Message",
      formSubmit: "Send Message",
      formSending: "Sending...",
      formSuccess: "Thanks — your message has been sent. We'll get back to you soon.",
      formError: "Something went wrong sending your message. Please try again.",
    },
    gallery: {
      all: "All Works",
      finished: "Finished",
      unfinished: "In Progress",
      empty: "No artworks found in this category.",
      workInProgress: "Work in progress",
      priceOnRequest: "Price on request",
    },
    about: {
      heading: "About",
      bio: "[PLACEHOLDER — bio text coming soon]",
      photoAlt: "Photo of the artist",
    },
    footer: {
      rights: "All rights reserved.",
    },
  },
  pt: {
    nav: {
      home: "Início",
      about: "Sobre",
      gallery: "Galeria",
      contact: "Contacto",
    },
    home: {
      heroTitleLine1: "Onde a Arte",
      heroTitleLine2: "Encontra a Visão",
      heroSubtitle:
        "Trabalho contemporâneo que explora os limites entre a cor, a forma e a emoção.",
      viewGallery: "Ver Galeria",
      learnMore: "Saber Mais",
      aboutLabel: "Sobre a Artista",
      aboutHeading: "Fingertips",
      aboutBody: "[SUBSTITUIR — biografia da artista em breve]",
      aboutPhotoAlt: "Retrato da artista",
      contactLabel: "Contacte-nos",
      contactHeading: "Encomendar uma Obra",
      contactBody:
        "Interessado em adquirir uma obra ou encomendar um trabalho original? Contacte-nos para discutir a sua visão.",
      formName: "Nome",
      formEmail: "Email",
      formMessage: "Mensagem",
      formSubmit: "Enviar Mensagem",
      formSending: "A enviar...",
      formSuccess: "Obrigado — a sua mensagem foi enviada. Entraremos em contacto em breve.",
      formError: "Ocorreu um erro ao enviar a sua mensagem. Por favor, tente novamente.",
    },
    gallery: {
      all: "Todas as Obras",
      finished: "Concluídas",
      unfinished: "Em Progresso",
      empty: "Nenhuma obra encontrada nesta categoria.",
      workInProgress: "Obra em progresso",
      priceOnRequest: "Preço a pedido",
    },
    about: {
      heading: "Sobre",
      bio: "[SUBSTITUIR — texto biográfico em breve]",
      photoAlt: "Fotografia da artista",
    },
    footer: {
      rights: "Todos os direitos reservados.",
    },
  },
} as const

export type Dictionary = typeof dictionary.en
