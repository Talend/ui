# Transform Design system process

## Current status of DS?

- A dedicated team → 2 DS dev + 1 DS designer
- <span style="background-color: #d4f3e6">In collaboration with products designers/content designers</spam>
- <span style="background-color:#fbd7dd">Lack of collaboration from product developers</span>
- <span style="background-color:#fbd7dd">Low usage in products</span>
- How can we move from the DS team to something?

## Org proposals

- Have a composite team from the different projects (1 or 2 devs per team) and Designers => DS Champions 🎖

  - Goal : Bring the product teams inside the process of build the DS

  - Existing teams (nb of frontend dev):

    - API : Tester / Designer / Creator (1,5?)
    - DGD : Data Preparation / Data Stewardship / Data Inventory (4,5)
    - DPD : Pipeline Designer (3)
    - TDOPS : TMC / Portal / IDAAS (7)
    - STITCH ?

  - Placeholder DS in products <span style="background-color:#fbd7dd">(see TBD section)</span>
    - Jira: Main topic on TUx and one on a product to do the link between DS roadmap and project activities?

## How to construct a roadmap

Discuss the roadmap:

- P1

  - Create new components
  - Update existing components in DS (not those in TUI)

- P2 (background tasks, less priority)
  - Integrate & migrate existing components (TUI) to the DS
  - Organise products migration

## Process

- 1 weekly meeting:

  - To discuss of subjects: 1 squad / subject with a small team composed with dev and UX designer (and Content designer when it's needed)

- 1 monthly meeting

  - To share progress, organise internal roadmap (manage subject and squad) and construct roadmap who will be shared with product teams.
  - How to prepare this meeting?

    - There would be a need to have someone to animate the agenda
    - Manage a board:
      > Jira? github project?
    - Do we need UX designer?
      > YES
    - How to define the agenda?
      > Agenda is construct with subject of previous meeting (see progress, make decision) and new needs (need to manage priority)
    - How will we share squad result?

      > Squad should share a quick status (ready or not, ask for help): like a daily

      > if too much question stop and redirect to off line meeting

## To be discussed and defined

- How to manage deprecation?

  - when the component is migrated to the DS, set the TUI component to deprecated <span style="background-color:#fbd7dd">for a time to define</span>

- How to organise/plan work with projects?

- How to organise migrations from existing components to DS ones (sometime can need to rework on the screen design to respect DS rules)

- Do we want to try to migrate 1 screen at the time?

- Do we want to try to migrate 1 type of component?

- When we have issue migrating a component from react-component to the DS, some uses cases will not fit the DS, we have to sometime discuss with the product designer to adapt the current UX to the DS (but not every time updating the DS for every needs, DS need to imply some contraints)

- Example of complex subjects:
  - Lists
  - Header bar
  - Forms ?
  - Sidepanel
  - …
