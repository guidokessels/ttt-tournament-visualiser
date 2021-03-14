import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./OptionsScreen.module.css";

export const OptionsScreen = () => {
  const [generatedUrl, setGeneratedUrl] = useState("");

  return (
    <div className={styles.Screen}>
      <div>
        <h1>Tabletop.to Tournament Visualiser</h1>
        <p>
          Fill in a Tabletop.to tournament URL below to get a link to render the
          top cut bracket.
        </p>
        <Formik
          initialValues={{ tournamentUrl: "" }}
          validate={(values) => {
            const errors: Record<string, string> = {};
            if (!getTabletopTournamentId(values.tournamentUrl)) {
              errors.tournamentUrl = "Not a valid tabletop.to url";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            const tournamentId = getTabletopTournamentId(values.tournamentUrl);
            setGeneratedUrl(
              `${window.location.origin}${window.location.pathname}?tournament=${tournamentId}`
            );
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className={styles.FormGroup}>
                <label htmlFor="tournamentUrl">
                  Tabletop.to tournament URL:
                </label>
                <div>
                  <Field
                    type="url"
                    name="tournamentUrl"
                    placeholder="https://tabletop.to/my-xwing-tournament"
                    style={{ "min-width": "300px" }}
                  />
                  <ErrorMessage name="tournamentUrl" component="div" />
                </div>
              </div>
              <button type="submit" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
        {generatedUrl ? (
          <p>
            You can find the tournament bracket at:{" "}
            <a href={generatedUrl} target="_blank" rel="noreferrer">
              {generatedUrl}
            </a>
          </p>
        ) : null}
        <p className={styles.WIP}>This is a work in progress</p>
      </div>
    </div>
  );
};

function getTabletopTournamentId(url: string): string | null {
  const matches = url.match(/tabletop\.to\/([a-z-]*)/i);
  if (!matches) {
    return null;
  }
  return matches[1];
}
