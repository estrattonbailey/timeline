# Timeline Assignment

<br>

🕹 [Demo Site](https://estrattonbailey-timeline.now.sh/)

<br>

My main goal with that was to consider how the application might ingest data -
like from a database or user input - and then digest it into a simple relational
abstraction that allowed for easy rendering to the page.

In my solution, dates are consumed as strings and compared as date timestamps
so that comparison logic is just simple math. I'm also creating *pseudo*-relations
between events within the date range, and the days they fall on. Using an
abstraction like this allows me to select an individual day and see what events
are happening on that day. I'm then rendering days as "columns" and the
day's events as "rows" within the timeline.

To ensure events are able to extend across multiple columns, event rows within a
single day are compared to an index of pre-existing events from the last loop.
If the event is already present, it retains it's position. If a new event doesn't
exist on the row index, and a prior event is no longer occurring on a given day,
the prior event is replaced by the the new event in the row index. Events are
rendered on their starting day, or the first day of the selected date range,
whichever is greater. They are assigned a width based on their duration in days,
which gives them the appearance of spanning across a period of time in the
timeline.

This approach is a pretty focused lens into what would be a larger discussion of
database schemas and queries. For instance, perhaps it would be easier to store
dates as timestamps to begin with to aid in database queries, as well as
ingestion on the frontend. Taking that into account, I think it provides a solid
example of a programmatic solution to what could otherwise be accomplished some
clever CSS and minimal JavaScript. In that way, I believe it's a more scalable
solution, and some concepts here could be used to scale up to a real world app.

A couple of things I'd like to note:
- I copied the existing events to April 2019 so that you don't have to click
  back to 2018 in the date pickers. The original events are still there in 2018
  though, if you'd like to view them.
- I really like how with short date ranges it "zooms" in on the columns, and
  events appear and fall off on either end of the range.

### Improvements I'd like to make

The are a few things I'd definitely change given time to more deeply hash things
out.

- The filtering and sorting logic currently uses closures via `reduce` `map` and
  `filter`, but I'm positive it could be done cleanly using nested `for` loops
  and `label`s. That would give a performance boost, which I expect could be
  significant given a large enough dataset.
- `localStorage` isn't a given in all browsers, and I'm not handling scenarios
  where it's disabled or where a browser has run out of space. IRL this would be
  hooked up to a remote database or IndexedDB.
- Date pickers are kind of toss up on desktop. Safari doesn't even include one!
  So it would be a good idea to either implement a custom date picker library,
  or create an abstraction that allows for basic date validation and an easy
  interface for users to select a date. A quick solve could be to select view by
  day/week/month, and arrow keys to page between ranges, *a la* Google Calendar.
- A pet peeve of mine is sites that aren't keyboard accessible. I expect things
  to be tab-able, and popups and modals to close on ESC.
- I don't love how the events re-order themselves when adding new ones. If this
  had drag-and-drop functionality (which it should), users would expect to be
  able to order the events, top-to-bottom.
- There still some logic handled in the returned JSX that I'd like to handle
  elsewhere as much as possible. Views should be views, and then your core logic
  can be tested in silo.

### Testing

Testing this would be fairly straightforward. I've abstracted out a few helpers
that would be trivial to test. If I had more time and were rewriting the
filtering logic using labeled for loops, I'd write out some mock
events and feed date ranges to that algorithm. With nested loops, having a way
to run mock data through is incredibly helpful in creating a "visual"
understanding of what's happening to the data.

Some core things I would test first:

- event start dates must be before end dates
- user selected date-range start must be before date-range end
- events can be associated with days
- event row order is maintained across days
- event row order is predictable i.e. for drag-and-drop

Closely related to testing is typing. I included some PropTypes validations and
JSDoc comments for clarity, but ideally something like this as part of a larger
application would use Flow or Typescript as well.

### Wrapping up
The core logic and solution took me almost four hours, and then I spent a little
over an hour writing the add event form and making the whole thing look
presentable. So I think 3-5 is pretty accurate, but for me at least it was easy
to take the full time laboring over smaller things.

I think it's a fun assignment overall. A lot of my open source work stems from
trying to solve little focused problems like this that I've come across in my
work, like routing, state, animations, etc.

Thanks!

### Running this project
I used the included CRA base, so it's just `npm start` as normal.
