/**
 *  Copyright (C) 2006-2019 Talend Inc. - www.talend.com
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */


import org.apache.batik.transcoder.TranscoderException
import org.apache.batik.transcoder.TranscoderInput
import org.apache.batik.transcoder.TranscoderOutput
import org.apache.batik.transcoder.image.ImageTranscoder
import org.apache.batik.transcoder.image.PNGTranscoder

import java.awt.*
import java.awt.image.BufferedImage
import java.nio.charset.StandardCharsets
import static java.util.stream.Collectors.joining

log.info 'Converting SVG icons to PNG'


def rootOutput = new File(project.build.directory, "classes/icons/png/")
generatePng(rootOutput, new File(project.basedir, "src/svg"))
generatePng(rootOutput, new File(project.basedir, "src/svg-deprecated"))


def generatePng(File rootOutput, File svg) {
    svg.listFiles()
            .findAll {
                it.name.endsWith('.svg')
            }
            .each {
                def png = new File(rootOutput, it.name.substring(0, it.name.lastIndexOf('.')) + '_icon32.png')
                png.parentFile.mkdirs()

                def out = new FileOutputStream(png)
                byte[] svgBytes = new BufferedReader(new InputStreamReader(new FileInputStream(it))).lines().collect(joining("\n")).getBytes(StandardCharsets.UTF_8)
                out.write(toPng(it.name, svgBytes))
                out.close()
            }
}

def toPng(String name, byte[] svg) throws IOException {
    // convert svf to png at the right size (32x32)
    def pngTranscoder = new PNGTranscoder() {
        @Override
        void writeImage(BufferedImage img, TranscoderOutput output) throws TranscoderException {
            // otherwise all web icon are just plain black and studio ignores the alpha in its
            // md5 cache key so we just get only one icon
            for (def x = 1; x < img.getWidth() - 1; x++) {
                for (def y = 1; y < img.getHeight() - 1; y++) {
                    Color color = new Color(img.getRGB(x, y), true);
                    if (color.getAlpha() == 0) { // enforce some differences for all black images
                        img.setRGB(x, y, new Color(255, 255, 255, color.getAlpha()).getRGB());
                    }
                }
            }

            super.writeImage(img, output);
        }
    }
    pngTranscoder.addTranscodingHint(ImageTranscoder.KEY_HEIGHT, 32f);
    pngTranscoder.addTranscodingHint(ImageTranscoder.KEY_WIDTH, 32f);
    def ostream = new ByteArrayOutputStream();
    try {
        pngTranscoder.transcode(new TranscoderInput(new ByteArrayInputStream(svg)), new TranscoderOutput(ostream));
    } catch (final TranscoderException e) {
        throw new IllegalStateException("Icon ${name}", e);
    }
    ostream.close();

    ostream.toByteArray();
}

