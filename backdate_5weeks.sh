for day in {14..49}; do
    # Get the commit date (set to midday) for the given day.
    commit_date=$(date -v-${day}d "+%Y-%m-%dT12:00:00")
    echo "Date: $commit_date"

    # Generate a random number between 1 and 5 for the number of commits.
    num_commits=$(( RANDOM % 5 + 1 ))
    echo "Creating $num_commits commit(s) for $commit_date"

    # Loop to create the desired number of commits.
    for (( commit=1; commit<=num_commits; commit++ )); do
        # Add a few seconds offset for each commit to ensure unique timestamps.
        commit_datetime=$(date -v+${commit}S -j -f "%Y-%m-%dT12:00:00" "$commit_date" "+%Y-%m-%dT%H:%M:%S")
        # Create an empty commit with specified author/committer date.
        GIT_AUTHOR_DATE="$commit_datetime" GIT_COMMITTER_DATE="$commit_datetime" \
        git commit --allow-empty -m "Backdated commit for $commit_datetime (commit #$commit)"
    done
done
