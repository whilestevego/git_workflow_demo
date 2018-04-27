To clone this repo all the branches at once, run the following commands:

Clone it.

```bash
git clone git@github.com:CodeCoreYVR/git_workflow_demo.git
cd git_workflow_demo
```

Run some 🔮 script to create local copies of all branches. [Credit 
due](https://stackoverflow.com/a/4754797)

```bash
git branch -a | grep -v HEAD | perl -ne 'chomp($_); s|^\*?\s*||; if (m|(.+)/(.+)| && not $d{$2}) {print qq(git branch --track $2 $1/$2\n)} else {$d{$_}=1}' | csh -xfs
```

Delete the `.git` directory.

```bash
rm -rf .git
```
