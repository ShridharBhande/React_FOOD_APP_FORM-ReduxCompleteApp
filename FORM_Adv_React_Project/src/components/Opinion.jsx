import {OpinionsContext} from "../store/opinions-context"
import { use, useActionState, useOptimistic } from 'react';

export function Opinion({ opinion: { id, title, body, userName, votes } }) {
  const { upvoteOpinion, downvoteOpinion} = use(OpinionsContext);

  const [optimisticState, setVotesOptimistically] = useOptimistic(votes, (prevVote, mode) => (mode === 'up' ? prevVote + 1 : prevVote - 1));

  async function UPGRADE() {
    setVotesOptimistically('up');
    await upvoteOpinion(id);
  }

 async function DOWNGRADE() {
    setVotesOptimistically('down');
    await downvoteOpinion(id);
  }

  const [upgradeFormState, upgradeFormAction, upgradeIsPending] = useActionState(UPGRADE, null);
  const [downgradeFormState, downgradeFormAction, downgradeIsPending] = useActionState(DOWNGRADE, null);

  return (
    <article>
      <header>
        <h3>{title}</h3>
        <p>Shared by {userName}</p>
      </header>
      <p>{body}</p>
      <form className="votes">
        <button formAction={upgradeFormAction} disabled={upgradeIsPending || downgradeIsPending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="m16 12-4-4-4 4" />
            <path d="M12 16V8" />
          </svg>
        </button>

        <span>{optimisticState}</span>

        <button  formAction={downgradeFormAction} disabled={upgradeIsPending || downgradeIsPending}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" />
            <path d="M12 8v8" />
            <path d="m8 12 4 4 4-4" />
          </svg>
        </button>
      </form>
    </article>
  );
}
