# DAY_3 – GIT MASTERY

## Overview
This repository contains exercises for mastering advanced Git workflows including `reset`, `revert`, `cherry-pick`, `bisect`, and `stash`.  
The goal is to simulate real-world scenarios where mistakes happen and need to be recovered properly, while maintaining good commit discipline.

---

## Learning Outcomes
- Ability to recover from mistakes using Git commands
- Proper commit workflow and branch management
- Identifying buggy commits using `git bisect`
- Using `git revert` to undo changes safely
- Practicing the stash workflow for handling uncommitted changes
- Merging conflicting changes from multiple clones

---

## Tasks

1. **Repository Setup**
   - Initialize a new repository with at least **8 commits**
   - Introduce an **intentional bug** in commit 4 for bisect practice

2. **Git Bisect**
   - Use `git bisect` to locate the buggy commit
   - Verify the issue

3. **Reverting Bug**
   - Use `git revert` to undo only the buggy commit (not reset)

4. **Stash Workflow**
   - Simulate uncommitted changes:
     ```bash
     git stash
     git pull
     git stash apply
     ```
   - Resolve any conflicts if necessary

5. **Merge Conflict Exercise**
   - Using two clones of the repo, edit the same line in the same file
   - Merge changes and resolve conflicts, keeping both modifications

---

## Repository Structure

```text
DAY_3-GIT_MASTERY/
├── app.js               # Main JS file for exercises
├── bisect-session.txt   # Terminal log of git bisect process
├── package.json         # Node project config (if needed)
└── report.md            # Exercise report and explanation
