# Tests UI

One of my exams last semester was based on questions we got in quizzes during the semester. When doing a quiz, you got a small subset of the questions from the pool, same with the exam. The entire pool was accessible from the quizzes, so you could prepare for the exam fully by doing the quizzes.

Sure, knowing the material is great and all, but grades also matter. While I studied hard during the semester (frfr), I still decided to take the last two days to focus on learning the questions and not the material. But like, why spent 6 seconds doing a task when you can spend 6 hours failing to automate it?

So, I made my own (custom) UI for the quizzes. The benefit it had over the platform my school used was the instant feedback. That works significantly better for the kind of short term retention I was going for.

Yes, I did put in like 14 hours right before an important exam to make a UI that would save me 6 seconds. This is the kind of thing I live for, sue me or something.

And it did work. I memorized the questions almost perfectly.

So, here's a dump of it all. The questions in `app/data/tests.json` were replaced with a dummy file since I don't know whether I'm allowed to just leak the course materials (probably not). The UI is still there, though, working significantly better when there are more questions, and you can use it with your own.

It's buggy, but it's not too ugly (prettier than what my school was using so that's a W), and it works. Well, it works in devmode - I never actually tried to build the app. Worked on my phone when not refreshing the page even while my laptop (with the server running) was off. I'm calling that a feature, as it let me study in bed and on my way to the exam.
