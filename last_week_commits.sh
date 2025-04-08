for i in {1..7}; do
    # On macOS, '-v-${i}d' subtracts i days from the current date.
    commit_date=$(date -v-${i}d "+%Y-%m-%dT12:00:00")
    # Display the commit date for debugging.
    echo "Creating commit for: $commit_date"
    # Create an empty commit with both author and committer dates set to commit_date.
    GIT_AUTHOR_DATE="$commit_date" GIT_COMMITTER_DATE="$commit_date" \
    git commit --allow-empty -m "Commit for $commit_date"
done

