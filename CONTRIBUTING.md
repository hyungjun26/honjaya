# Contributing

## Branches
- Try to keep the branch as short as possible.

+ release: master branch
+ develop: develop branch (default)
+ feature: feature/{TASK_SCOPE}/{TASK_NAME} branch
    - {TASK_SCOPE} refers to a category of applications, and the following are examples of possible patterns:
        * ai
        * api
        * web
        * app
    - {TASK_NAME} means a function that you implement and must match `/[a-z-]/` pattern.
    - e.g. feature/ai/image-segmentation
    - e.g. feature/web/login

## Commit
- Write a message that **clearly identifies what you did**.
- Do not create unnecessary commit.
- Avoid excessively large-sized commit.

+ Commit messages should contain the Jira issue number and be verb based, using the following pattern:  
    - JIRA_ISSUE_NUMBER Add ...
    - JIRA_ISSUE_NUMBER Fix ...
    - JIRA_ISSUE_NUMBER Update ...
    - JIRA_ISSUE_NUMBER Remove ...
    * e.g. S03P22A409-12 Remove console log on startup

## Merge Requests
- **Describes the modifications** made to the commit set so that others can understand them.

+ Title
    - For a single commit, use the commit message as the subject.
    - For multiple commit, summarize the commit set and use it as the title.
## Documentation
> *Please update the docs* accordingly so that there are no discrepancies between the API and the documentation.
