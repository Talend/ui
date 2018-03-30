package org.talend.axeselenium.axe;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

public class Options {
    private String runOnlyType;
    private String[] runOnlyValues;

    private List<String> rulesToEnable;
    private List<String> rulesToDisable;

    private Options(final String runOnlyType, final String[] runOnlyValues, final List<String> rulesToEnable, final List<String> rulesToDisable) {
        this.runOnlyType = runOnlyType;
        this.runOnlyValues = runOnlyValues;
        this.rulesToEnable = rulesToEnable;
        this.rulesToDisable = rulesToDisable;
    }

    public JSONObject toJSONObject() {
        final JSONObject jsonObject = new JSONObject();

        if (runOnlyType!= null && runOnlyValues != null) {
            final JSONObject runOnly = new JSONObject();
            runOnly.put("type", runOnlyType);
            runOnly.put("values", new JSONArray(runOnlyValues));
            jsonObject.put("runOnly", runOnly);
        }

        if (rulesToDisable.size() > 0 || rulesToEnable.size() > 0) {
            final JSONObject enabled = new JSONObject();
            enabled.put("enabled", true);

            final JSONObject disabled = new JSONObject();
            enabled.put("enabled", false);

            final JSONObject rules = new JSONObject();
            rulesToEnable.forEach(nextRule -> rules.put(nextRule, enabled));
            rulesToDisable.forEach(nextRule -> rules.put(nextRule, disabled));

            jsonObject.put("rules", rules);
        }

        return jsonObject;
    }

    public String toString() {
        return toJSONObject().toString();
    }

    public static Builder builder() {
        return new Builder();
    }

    private static class Builder {
        private String runOnlyType;
        private String[] runOnlyValues;

        private List<String> rulesToEnable = new ArrayList<>();
        private List<String> rulesToDisable = new ArrayList<>();

        public Builder runOnly(final String type, final String... values) {
            runOnlyType = type;
            runOnlyValues = values;
            return this;
        }

        public Builder enableRule(final String rule) {
            rulesToEnable.add(rule);
            return this;
        }

        public Builder disableRule(final String rule) {
            rulesToDisable.add(rule);
            return this;
        }

        public Options build() {
            return new Options(runOnlyType, runOnlyValues, rulesToEnable, rulesToDisable);
        }
    }
}
