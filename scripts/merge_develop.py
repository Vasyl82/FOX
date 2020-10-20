#!python3
from datetime import datetime
import subprocess

import click


@click.command()
def run():
    cmd = ["git", "branch", "--show-current"]
    output = get_output(cmd)
    branch_name = output.strip()
    exec_command(["git", "add", "."])
    exec_command(
        [
            "git",
            "commit",
            "-m",
            f'Intermidiate commit {datetime.now().strftime("%d-%b %H:%M")}',
        ]
    )
    exec_command(["git", "push"])
    exec_command(["git", "checkout", "develop"])
    exec_command(["git", "pull"])
    exec_command(["git", "checkout", branch_name])
    final_message = get_output(["git", "merge", "develop"])
    print(final_message)


def get_output(cmd):
    return subprocess.run(cmd, capture_output=True).stdout.decode()


def exec_command(cmd):
    return subprocess.run(cmd)


if __name__ == "__main__":
    run()
