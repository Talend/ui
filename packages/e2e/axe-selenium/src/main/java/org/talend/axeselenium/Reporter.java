package org.talend.axeselenium;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.*;

public class Reporter {
    private static final String lineSeparator = System.getProperty("line.separator");

    /**
     * Build a formatted string violation report
     * @param violations JSONArray of violations
     * @return readable report of accessibility violations found
     */
    public String report(final JSONArray violations) {
        final StringBuilder sb = new StringBuilder();
        sb
                .append("Found ")
                .append(violations.length())
                .append(" accessibility violations:");

        for (int i = 0; i < violations.length(); i++) {
            JSONObject violation = violations.getJSONObject(i);
            sb
                    .append(lineSeparator)
                    .append(i + 1)
                    .append(") ")
                    .append(violation.getString("help"));

            if (violation.has("helpUrl")) {
                String helpUrl = violation.getString("helpUrl");
                sb.append(": ")
                        .append(helpUrl);
            }

            JSONArray nodes = violation.getJSONArray("nodes");

            for (int j = 0; j < nodes.length(); j++) {
                JSONObject node = nodes.getJSONObject(j);
                sb
                        .append(lineSeparator)
                        .append("  ")
                        .append(getOrdinal(j + 1))
                        .append(") ")
                        .append(node.getJSONArray("target"))
                        .append(lineSeparator);

                JSONArray all = node.getJSONArray("all");
                JSONArray none = node.getJSONArray("none");

                for (int k = 0; k < none.length(); k++) {
                    all.put(none.getJSONObject(k));
                }

                appendFixes(sb, all, "Fix all of the following:");
                appendFixes(sb, node.getJSONArray("any"), "Fix any of the following:");
            }
        }

        return sb.toString();
    }

    private void appendFixes(final StringBuilder sb, final JSONArray arr, final String heading) {
        if (arr != null && arr.length() > 0) {
            sb
                    .append("    ")
                    .append(heading)
                    .append(lineSeparator);

            for (int i = 0; i < arr.length(); i++) {
                JSONObject fix = arr.getJSONObject(i);

                sb
                        .append("      ")
                        .append(fix.get("message"))
                        .append(lineSeparator);
            }

            sb.append(lineSeparator);
        }
    }

    private String getOrdinal(int number) {
        String ordinal = "";

        int mod;

        while (number > 0) {
            mod = (number - 1) % 26;
            ordinal = (char) (mod + 97) + ordinal;
            number = (number - mod) / 26;
        }

        return ordinal;
    }

    /**
     * Writes a raw object out to a JSON file with the specified name.
     *
     * @param name   Desired filename, sans extension
     * @param output Object to write. Most useful if you pass in either the Builder.analyze() response or the
     *               violations array it contains.
     */
    public void writeResults(final String name, final Object output) {
        Writer writer = null;

        try {
            writer = new BufferedWriter(
                new OutputStreamWriter(
                    new FileOutputStream(name + ".json"),
                    "utf-8"
                )
            );

            writer.write(output.toString());
        } catch (IOException ignored) {
        } finally {
            try {
                writer.close();
            } catch (Exception ignored) {}
        }
    }
}
