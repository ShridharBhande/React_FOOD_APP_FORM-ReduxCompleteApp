import { useActionState, use } from "react";
import { OpinionsContext } from "../store/opinions-context";
import { Submit } from "./Submit";

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);

  async function newOpinionAction(prevState, formData) {
    console.log("-- formData -->", formData);
    const userName = formData.get("userName");
    const title = formData.get("title");
    const body = formData.get("body");

    const errors = [];

    if (!userName) {
      errors.push("Please provide userName");
    }
    if (!body || body.length < 10) {
      errors.push("Please provide body more than 10 words");
    }

    if (!title || title.length < 5) {
      errors.push("Please provide title more than 5 charcters legnth");
    }

    if (errors.length) {
      return {
        errors,
        enteredValue: {
          title,
          body,
          userName,
        },
      };
    }

    await addOpinion({ title, body, userName });
    return { errors: null };
  }

  const [formState, formAction] = useActionState(newOpinionAction, {
    errors: null,
  });

  console.log("-- isnide NewOption -->", formState);

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValue?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValue?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValue?.body}
          ></textarea>
        </p>
        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error} </li>
            ))}
          </ul>
        )}
        <Submit />

      </form>
    </div>
  );
}
