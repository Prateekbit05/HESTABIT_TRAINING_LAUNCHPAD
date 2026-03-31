# 🔀 MERGE POSTMORTEM — DAY 3 GIT MASTERY

## Overview
This document explains the merge conflict simulation exercise performed using two clones of the same repository. Both clones edited the same line in the same file, causing a conflict that was manually resolved while keeping both changes.

---

## 🔹 Setup: Two Clones of the Same Repo

```bash
# Clone 1 — Developer A
git clone git@github.com:Prateekbit05/DAY_3-GIT_MASTERY-HESTABIT.git clone-A
cd clone-A

# Clone 2 — Developer B
git clone git@github.com:Prateekbit05/DAY_3-GIT_MASTERY-HESTABIT.git clone-B
cd clone-B
```

---

## 🔹 Step 1: Developer A Makes a Change

```bash
cd clone-A
# Edit app.js — changed the discount logic
git add app.js
git commit -m "fix: update discount calculation logic in processOrder"
git push origin main
```

**Developer A's change in `app.js`:**
```javascript
// Developer A — fixed discount as flat value
return total - discount;
```

---

## 🔹 Step 2: Developer B Makes a Conflicting Change

```bash
cd clone-B
# Edit the same line in app.js — different fix
git add app.js
git commit -m "fix: apply percentage-based discount in processOrder"
```

**Developer B's change in `app.js`:**
```javascript
// Developer B — fixed discount as percentage
return total - (total * discount) / 100;
```

---

## 🔹 Step 3: Conflict Occurs on Pull

```bash
cd clone-B
git pull origin main
```

**Terminal Output:**
```
Auto-merging app.js
CONFLICT (content): Merge conflict in app.js
Automatic merge failed; fix conflicts and then commit the result.
```

---

## 🔹 Step 4: Conflict Markers in app.js

```javascript
function processOrder(total, discount) {
<<<<<<< HEAD
    // Developer B — percentage-based discount
    return total - (total * discount) / 100;
=======
    // Developer A — flat discount value
    return total - discount;
>>>>>>> origin/main
}
```

---

## 🔹 Step 5: Manual Resolution — Keeping Both Changes

Both changes were preserved by combining the logic:

```javascript
function processOrder(total, discount, isPercentage = true) {
    // Resolved: support both flat and percentage-based discount
    if (isPercentage) {
        return total - (total * discount) / 100;  // Developer B
    }
    return total - discount;  // Developer A
}
```

---

## 🔹 Step 6: Commit the Resolved Merge

```bash
git add app.js
git commit -m "merge: resolve conflict in processOrder — keep both flat and percentage discount logic"
git push origin main
```

---

## 🔹 Commit Graph After Merge

```bash
git log --oneline --graph --all
```

**Output:**
```
*   a1b2c3d merge: resolve conflict in processOrder — keep both flat and percentage discount logic
|\
| * f4e5d6c fix: update discount calculation logic in processOrder (Developer A)
* | 9g8h7i6 fix: apply percentage-based discount in processOrder (Developer B)
|/
* 3j2k1l0 feat: add order processing with discount calculation
* 5m4n3o2 feat: add product listing functionality
* 7p6q5r4 feat: add cart management module
* 9s8t7u6 bug: incorrect discount calculation (intentional bug - commit 4)
* 1v2w3x4 feat: add user authentication module
* 5y6z7a8 feat: initialize order processing application
```

---

## 🔹 Resolution Strategy

| Item | Detail |
|------|--------|
| Conflict File | `app.js` |
| Conflict Line | `processOrder()` return statement |
| Developer A Change | Flat discount value |
| Developer B Change | Percentage-based discount |
| Resolution | Combined both using `isPercentage` flag |
| Both Changes Kept | ✅ Yes |

---

## 🔹 Key Takeaway

> Merge conflicts happen when two developers edit the **same line** in the same file. The resolution requires **manual intervention** — git cannot automatically decide which change to keep. In this case, both changes were valid and were combined into a single, more flexible solution rather than discarding either one.

---

## 🔹 Commands Reference

```bash
# Check conflict status
git status

# See conflict markers
cat app.js

# After manual resolution
git add app.js
git commit -m "merge: resolve conflict keeping both changes"

# View merge graph
git log --oneline --graph --all
```

