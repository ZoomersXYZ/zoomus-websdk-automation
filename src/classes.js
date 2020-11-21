class Dom {
  constructor( thePage ) {
    this.S = ' ';
    this.page = thePage;
  };
};

class MeetingControls extends Dom {
  rootDom = 'footer#wc-footer';
  participantsDom = this.rootDom + ' ' + 'div.footer-button__participants-icon';
  
  async activateParticipants() {
  };

  async deactivateParticipants() {
  };
};

class Participants extends Dom {
  static rootDom = 'div#wc-container-right';
  static siblingheaderDom = this.rootDom + ' ' + 'div.participants-header__header';
};

class ParticipantsMore extends Participants {
};

class ChatBox extends Dom {
};

class Initial extends Dom {
  rootDom = 'div.join-dialog';
  middleDom = ' div[role="tablist"]';
  closeButtonDom = ' > button[type="button"]';
  closeDialogDom = this.rootDom + this.middleDom + this.closeButtonDom;

  async closeDialog() {
  };
};

class Doc {
  constructor( page ) {
    this.controls = new MeetingControls( page );
    this.people = new Participants( page );
    this.more = new ParticipantsMore( page );
    this.chat = new ChatBox( page );
    this.initial = new Initial( page );
  };
};

export default Doc;
