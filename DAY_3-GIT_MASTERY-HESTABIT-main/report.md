# DAY 3 — GIT MASTERY REPORT

## Objectives
The objective of Day 3 was to gain hands-on mastery of advanced Git workflows used in real-world software development environments. This lab focused on error recovery, debugging commit history, safe undo operations, and collaborative conflict resolution.

---

## 🔹 Learning Outcomes
By completing this lab, the following skills were achieved:
- Ability to identify faulty commits using `git bisect`
- Safe rollback of bugs using `git revert`
- Recovery from accidental changes using `git stash`
- Understanding and resolving merge conflicts
- Practicing industry-level commit discipline

---

## Repository Structure
```
DAY_3-Git_Mastery/
├── app.js
├── bisect-session.txt
├── stash-session.txt
├── MERGE-POSTMORTEM.md
├── commitsGraph.txt
└── report.md
```

---

## Task 1: Commit Discipline & Bug Introduction
A Node.js application simulating an industry-based order processing system was developed incrementally.

Each commit represented a single responsibility.

An intentional bug was introduced in **Commit 4**, where the discount logic was incorrectly implemented.

**Buggy Logic:**
```javascript
return total - discount;
```

This simulated a real-world production bug.

---

## Task 2: Bug Detection Using `git bisect`
The `git bisect` command was used to perform a binary search across commit history to identify the faulty commit.

### Commands Used
```bash
git bisect start
git bisect bad
git bisect good HEAD~6
```

The bisect process successfully identified the commit:
```
bug: incorrect discount calculation
```

The bisect session log was saved as `bisect-session.txt`.

---

## Task 3: Bug Fix & Safe Revert
The incorrect discount logic was fixed using the proper percentage calculation.

**Correct Logic:**
```javascript
return total - (total * discount) / 100;
```

Instead of rewriting history, `git revert` was used to safely undo the buggy commit, ensuring compatibility with shared repositories.

---

## Task 4: Temporary Change Management Using `git stash`
The `git stash` workflow was used to temporarily store uncommitted changes while synchronizing with the remote repository.

### Commands Used
```bash
git stash
git pull
git stash apply
```

The stash session details were saved as `stash-session.txt`.

---

## Task 5: Merge Conflict Simulation & Resolution
Two clones of the same repository were used to simulate a real-world collaboration scenario where two developers modified the same line in the same file.

A merge conflict occurred during `git pull`.

### Resolution Strategy
- Conflict markers were manually resolved
- Both changes were preserved
- Final merged code was committed

A detailed explanation was documented in `MERGE-POSTMORTEM.md`.

---

## Commit Graph Analysis
The commit graph clearly demonstrates:
- Linear feature development
- Bug introduction and identification
- Safe revert operation
- Merge commit after conflict resolution

The commit graph was captured using:
```bash
git log --oneline --graph --all
```
and saved as `commitsGraph.txt`.

---

## Industry Relevance
The workflows practiced in this lab mirror real-world software engineering processes:
- Debugging production issues using bisect
- Avoiding destructive history changes
- Handling parallel development conflicts
- Maintaining clean and readable commit history

These practices are essential for working in collaborative engineering teams.

---

## Conclusion
Day 3 provided practical exposure to advanced Git features required for professional development environments. The lab reinforced the importance of commit discipline, safe error recovery, and collaboration-aware workflows.
