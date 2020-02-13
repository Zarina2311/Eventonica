describe("EventRecommender", () => {
    const { EventRecommender, User, Event } = require('../events.js');
    let er; 
  
    beforeEach(() => {
      er = new EventRecommender();
    });
  
    describe("addEvent", () => {
      it("adds a new Event to the system", () => {
        er.addEvent(4, "Concert of JLo", "2021-04-16", "concert");
        expect(er.events.length).toEqual(1);
        expect(er.events[0].name).toEqual("Concert of JLo");
        expect(er.events[0].id).toEqual(4);
        expect(er.events[0].date).toEqual("2021-04-16");
        expect(er.events[0].category).toEqual("concert");
        expect(er.events[0].title).toBeUndefined();
      });
    });
  
    describe("addUser", () => {
      it("adds a new User to the system", () => {
        er.addUser(23, "Tori");
        expect(er.users.length).toEqual(1);
      });
    });
  
    describe("saveUserEvent", () => {
      it("adds an event to a user's personal event array", () => {
        er.addEvent(21, "Food festival", "2020-03-08", "food");
        er.addUser(901, "Bob");
        er.saveUserEvent(er.users[0], er.events[0]);
        expect(er.users[0].personalEvents.length).toEqual(1);
      });
    });
  
    describe("deleteUser", () => {
      it("removes a User from the system", () => {
        er.addUser(11, "Stephen");
        er.deleteUser(11);
        expect(er.users.length).toEqual(0);
      });
    });
  
    describe("deleteEvent", () => {
      it("removes the event from the system", () => {
        er.addEvent(5, "Dance performance", "2020-02-14", "entertainment");
        er.deleteEvent(5);
        expect(er.events.length).toEqual(0);
      });
    });

    describe("findEventsByDate", () => {
      it("returns a list of events with date", () => {
        er.addEvent(87, "My Party", "2020-03-01", "party");
        er.addEvent(91, "Boring Speech", "2020-05-01", "government");
        er.addEvent(101, "Book Signing", "2020-03-01", "marketing");
        expect(er.findEventsByDate("2020-03-01").length).toEqual(2);
      });
    });

    describe("findEventsByCategory", () => {
      it("returns a list of events with category", () => {
        er.addEvent(87, "My Party", "2020-03-01", "party");
        er.addEvent(91, "Boring Speech", "2020-05-01", "government");
        er.addEvent(101, "Birthday Celebration", "2020-03-01", "party");
        expect(er.findEventsByCategory("party").length).toEqual(2);
      });
    });

  });