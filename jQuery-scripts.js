$(document).ready(() => {
    const eventRecommender = new EventRecommender(); 
    eventRecommender.addUser(23, "Zarina");
    eventRecommender.addUser(11, "Lada");
    eventRecommender.addUser(94, "Ollie");

    eventRecommender.addEvent(123, "Dance Lessons", "2020-02-19", "dance");
    eventRecommender.addEvent(456, "Concert of JLo", "2020-03-08", "concert");
    eventRecommender.addEvent(789, "Film Festival", "2020-04-23", "film");
    eventRecommender.addEvent(290, "Art Crawl", "2020-04-17", "art");

    function displayUsers() {
        let content = $('<ul>');
        for (let i=0; i<eventRecommender.users.length; i++) {
            content.append("<li>" + eventRecommender.users[i].name + "</li>");
        }
        $("#all-users").html(content);
    }
    displayUsers();

    $("#add-user-submit").click(function(event) {
        // cancel refresh
        event.preventDefault();
        
        // get input
        let id = $("#add-user-id").val();
        let name = $("#add-user-name").val();

        // add user
        eventRecommender.addUser(id, name);

        // update the page
        displayUsers();

        // reset form
        $("#add-user").trigger("reset");
    });

    $("#delete-user-id-submit").click(function(event){
        // cancel refresh
        event.preventDefault();

        // get input
        let id = $("#delete-user-id").val();

        // delete user
        eventRecommender.deleteUser(id);

        // update the page
        displayUsers();

        // reset form
        $("#delete-user").trigger("reset");
    });


    function displayEvents() {
        let content = $('<ul>');
        for (let i=0; i<eventRecommender.events.length; i++) {
            content.append("<li>" + eventRecommender.events[i].name + "</li>");
        }
        $("#all-events").html(content);
    }
    displayEvents();

    $("#add-event-submit").click(function(event) {
        // cancel refresh
        event.preventDefault();
        
        // get input
        let id = $("#add-event-id").val();
        let name = $("#add-event-name").val();
        let date = $("#add-event-date").val();
        let category = $("#add-event-category").val();

        // add event
        eventRecommender.addEvent(id, name, date, category);

        // update the page
        displayEvents();

        // reset form
        $("#add-event").trigger("reset");
    });

    $("#delete-event-submit").click(function(event){
        // cancel refresh
        event.preventDefault();

        // get input
        let id = $("#delete-event-id").val();

        // delete event
        eventRecommender.deleteEvent(id);

        // update the page
        displayEvents();

        // reset form
        $("#delete-event").trigger("reset");
    });

    //Find events by date
    function displayEventsByDate(searchResults) {
        let content = $('<ul>');
        for (let i=0; i<searchResults.length; i++) {
            content.append("<li>" + searchResults[i].name + "</li>");
        }
        $("#event-date-results").html(content);
    }

    $("#date-search-submit").click(function(event){
        event.preventDefault();
        let query = $("#date-search-query").val();
        let searchResults = eventRecommender.findEventsByDate(query);
        displayEventsByDate(searchResults);
    });


    //Find events by category
    function displayEventsByCategory(searchResults) {
        let content = $('<ul>');
        for (let i=0; i<searchResults.length; i++) {
            content.append("<li>" + searchResults[i].name + "</li>");
        }
        $("#event-category-results").html(content);
    }

    $("#category-search-submit").click(function(event){
        event.preventDefault();
        let query = $("#category-search-query").val();
        let searchResults = eventRecommender.findEventsByCategory(query);
        displayEventsByCategory(searchResults);
    });
    
    //Save event for the user
    $("#save-user-event-submit").click(function(event){
        event.preventDefault();
        let userID = $("#save-user-id").val();
        let eventID = $("#save-event-id").val();
        eventRecommender.saveUserEvent(userID, eventID);
    });

    //Add API of Ticketmaster
    $("#event-keyword-submit").click(function(event){
        event.preventDefault();

        const keyword = $("#event-keyword-search").val();
        const url = `https://app.ticketmaster.com/discovery/v2/events?apikey=7elxdku9GGG5k8j0Xm8KWdANDgecHMV0&keyword=${keyword}&unit=miles&source=ticketmaster&locale=*&countryCode=US&preferredCountry=us`;
        
        $.getJSON(url, function(data) {
            let addedEvents = [];
            let events = data._embedded.events;

            $.each(events, function(key, event) {
                let id = event.id;
                let name = event.name;
                let date = event.dates.start.localDate;
                let category = event.classifications[0].segment.name;
                eventRecommender.addEvent(id, name, date, category);
                addedEvents.push(`<li id="${key}">${name}</li>`);
            });

            $("<ul/>", {
                "class": "import",
                html: addedEvents.join("")
            }).appendTo("#event-keyword-results");
        });
    });
});