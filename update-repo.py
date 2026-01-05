import os
import shutil
import subprocess

# --- CONFIG ---
REPO_URL = "git@github.com:shamrat05/webtest.git"
LOCAL_DIR = r"C:\Users\samra\Downloads\webtest"
SOURCE_DIR = r"C:\Users\samra\Downloads\shamrat-blog"
EXCLUDE_FOLDERS = {"Shamrat-on-web", "webtest", "node_modules"}

# --- FUNCTIONS ---
def run(cmd, cwd=None):
    print(f"Running: {cmd}")
    subprocess.run(cmd, cwd=cwd, shell=True, check=True)

# --- SCRIPT ---
# 1. Clone or reset repo
if not os.path.exists(LOCAL_DIR):
    run(f"git clone {REPO_URL} {LOCAL_DIR}")
else:
    run("git fetch --all", cwd=LOCAL_DIR)
    run("git reset --hard origin/main", cwd=LOCAL_DIR)

# 2. Delete all tracked files in repo
run("git rm -r *", cwd=LOCAL_DIR)
run('git commit -m "Delete all files"', cwd=LOCAL_DIR)
run("git push origin main", cwd=LOCAL_DIR)

# 3. Copy new files except excluded folders
for item in os.listdir(SOURCE_DIR):
    src_path = os.path.join(SOURCE_DIR, item)
    dest_path = os.path.join(LOCAL_DIR, item)
    if item in EXCLUDE_FOLDERS:
        print(f"Skipping {item}")
        continue
    if os.path.isdir(src_path):
        shutil.copytree(src_path, dest_path, dirs_exist_ok=True)
    else:
        shutil.copy2(src_path, dest_path)

# 4. Stage, commit, push
run("git add .", cwd=LOCAL_DIR)
run('git commit -m "Upload new project files excluding node_modules"', cwd=LOCAL_DIR)
run("git push origin main", cwd=LOCAL_DIR)

print("✅ Repo updated successfully!")