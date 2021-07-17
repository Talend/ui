package org.talend.axeselenium;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.*;
import java.util.Formatter;

public class Reporter {
    private static final String lineSeparator = System.getProperty("line.separator");

    /**
     * Build a formatted string violation report
     * @param violations JSONArray of violations
     * @return readable report of accessibility violations found
     */
    public String report(final JSONArray violations) {
        final StringBuilder sb = new StringBuilder();
        final Formatter fmt = new Formatter(sb);

        fmt.format("Found %d accessibility violations:", violations.length());

        for (int i = 0; i < violations.length(); i++) {
            final JSONObject violation = violations.getJSONObject(i);
            fmt.format(lineSeparator);
            fmt.format("%d) %s", i + 1, violation.getString("help"));

            if (violation.has("helpUrl")) {
                fmt.format(": %s", i + 1, violation.getString("helpUrl"));
            }

            final JSONArray nodes = violation.getJSONArray("nodes");

            for (int j = 0; j < nodes.length(); j++) {
                final JSONObject node = nodes.getJSONObject(j);
                fmt.format(lineSeparator);
                fmt.format("  %s) %s", getOrdinal(j + 1), node.getJSONArray("target"));
                fmt.format(lineSeparator);

                final JSONArray all = node.getJSONArray("all");
                final JSONArray none = node.getJSONArray("none");

                for (int k = 0; k < none.length(); k++) {
                    all.put(none.getJSONObject(k));
                }

                appendFixes(fmt, all, "Fix all of the following:");
                appendFixes(fmt, node.getJSONArray("any"), "Fix any of the following:");
            }
        }

        return sb.toString();
    }

    private void appendFixes(final Formatter fmt, final JSONArray arr, final String heading) {
        if (arr != null && arr.length() > 0) {
            fmt.format("    %s", heading);
            fmt.format(lineSeparator);

            for (int i = 0; i < arr.length(); i++) {
                JSONObject fix = arr.getJSONObject(i);

                fmt.format("      %s", fix.get("message"));
                fmt.format(lineSeparator);
            }

            fmt.format(lineSeparator);
        }
    }

    /**
     * Get an ordinal composed of letters, from a to z, then aa to az, the  ba to bz, ...
     * @param number The ordinal index number
     * @return The ordinal
     */
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
    public void writeResults(final String name, final Object output) throws FileNotFoundException {
        try (PrintWriter out = new PrintWriter(name + ".json")) {
            out.println(output.toString());
        }
    }

    /**
     * Writes a string report out to a text file with the specified name.
     *
     * @param name   Desired filename, sans extension
     * @param output Report to write
     */
    public void writeResults(final String name, final String output) throws FileNotFoundException {
        try (PrintWriter out = new PrintWriter(name + ".txt")) {
            out.println(output);
        }
    }
}
