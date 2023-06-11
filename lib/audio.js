import {
    Player,
    AutoFilter,
    Distortion,
    Destination,
    FeedbackDelay,
    BitCrusher,
    PitchShift,
    Vibrato,
    AutoPanner,
    Recorder
} from 'tone';

// initialize variables
export let player;

let interval_up, interval_down;
let finished = false;
let dynamic_effect = false;
export let fade_time = 0;
let feedbackDelay, filter, distortion, crusher, pitchshift, vibrato, panner;

// ^^^^^^^^^^^^^^^^^^^^^^^^^
// PREPARE PLAYER
// ^^^^^^^^^^^^^^^^^^^^^^^^^

export const preparePlayer = async (blob) => {
    console.log('preparePlayer', blob);

    // load audio file
    player = new Player(blob);

    // play as soon as the buffer is loaded
    player.autostart = true;

    // create effects
    createEffects();

    // connect chain of effects
    await createChain();

    // create event listener on stop
    // - update finished
    // - clear intervals
    player.onstop = function () {
        finished = true;
        clearIntervals();
    };

    // log errors
    player.onerror = function () {
        console.error('Tone.js error');
    };
};

// ^^^^^^^^^^^^^^^^^^^^^^^^^
// EFFECT CREATION
// ^^^^^^^^^^^^^^^^^^^^^^^^^

const createEffects = () => {
    distortion = new Distortion({
        distortion: 0.4,
        // oversample : none
        wet: 0
    });

    crusher = new BitCrusher({
        bits: 6,
        wet: 0
    });

    feedbackDelay = new FeedbackDelay({
        delayTime: '8n',
        feedback: 0.5,
        // maxDelay : 1,
        wet: 0
    });

    pitchshift = new PitchShift({
        pitch: 0,
        windowSize: 0.1,
        delayTime: 0,
        feedback: 0,
        wet: 0
    });

    vibrato = new Vibrato({
        // maxDelay: 0.005,
        frequency: 25,
        depth: 0.8,
        // type: sine,
        wet: 0
    });

    filter = new AutoFilter({
        frequency: 4,
        // type : sine ,
        // depth : 1 ,
        // baseFrequency : 200 ,
        // octaves : 2.6 ,
        // filter : {
        //     type : lowpass ,
        //     rolloff : -12 ,
        //     Q : 1
        // }
        wet: 0
    }).start();

    panner = new AutoPanner({
        frequency: 1,
        depth: 0.8
    });

    // modifiers
    // lfo = new LFO('4n', -24, 0);
    // lfo.connect(pitchshift.pitch);
};

const createChain = async () => {
    await player.chain(
        distortion,
        crusher,
        feedbackDelay,
        pitchshift,
        vibrato,
        filter,
        panner,

        Destination
    );
};

// ^^^^^^^^^^^^^^^^^^^^^^^^^
// CHANGE TO EFFECT
// ^^^^^^^^^^^^^^^^^^^^^^^^^

export const noEffect = async () => {
    muteAllEffects();
    dynamic_effect = false;
    fade_time = 0;
    await restartAudio();
};

export const addCaveEffect = async () => {
    muteAllEffects();
    dynamic_effect = false;
    feedbackDelay.wet.linearRampTo(1, 0.1);
    fade_time = 4000;
    await restartAudio();
};

export const addRandomEffect = async () => {
    muteAllEffects();
    dynamic_effect = false;
    fade_time = 0;
    vibrato.wet.linearRampTo(1, 0.1);
    panner.wet.linearRampTo(1, 0.1);
    await restartAudio();
};

export const addLoBatEffect = async () => {
    muteAllEffects();
    dynamic_effect = true;
    fade_time = 0;
    crusher.wet.linearRampTo(1, 0.1);
    pitchshift.wet.linearRampTo(1, 0.1);
    await restartAudio();
};

// ^^^^^^^^^^^^^^^^^^^^^^^^^
// UTILITY FUNCTIONS
// ^^^^^^^^^^^^^^^^^^^^^^^^^

const muteAllEffects = () => {
    // distortion,
    // crusher,
    // feedbackDelay,
    // pitchshift,
    // vibrato,
    // filter,
    // panner,

    // distortion.wet.linearRampToValueAtTime(0, player.now() + 0.5);
    // crusher.wet.linearRampToValueAtTime(0, player.now() + 0.5);
    // feedbackDelay.wet.linearRampToValueAtTime(0, player.now() + 0.5);
    // pitchshift.wet.linearRampToValueAtTime(0, player.now() + 0.5);
    // vibrato.wet.linearRampToValueAtTime(0, player.now() + 0.5);
    // filter.wet.linearRampToValueAtTime(0, player.now() + 0.5);
    // panner.wet.linearRampToValueAtTime(0, player.now() + 0.5);
    distortion.wet.linearRampTo(0, 0.1);
    crusher.wet.linearRampTo(0, 0.1);
    feedbackDelay.wet.linearRampTo(0, 0.1);
    pitchshift.wet.linearRampTo(0, 0.1);
    vibrato.wet.linearRampTo(0, 0.1);
    filter.wet.linearRampTo(0, 0.1);
    panner.wet.linearRampTo(0, 0.1);
};

const restartDynamicParameters = () => {
    pitchshift.pitch = 0;
    clearIntervals();
    setTimeout(startInterval, 200);
};

export const restartAudio = async (force = false) => {
    if (player && player.loaded) {
        if (finished || dynamic_effect || force) {
            await player.restart();
            await player.start();
            finished = false;

            if (dynamic_effect) restartDynamicParameters();
        }
    }
};

export const toggleAudio = async () => {
    if (player && player.loaded) {
        if (!finished) {
            await player.stop();
        } else {
            await restartAudio();
        }
    }
};

export const stopAudio = async () => {
    if (player && player.loaded) {
        await player.stop();
        finished = true;
        clearIntervals();
    }
};

// ^^^^^^^^^^^^^^^^^^^^^^^^^
// INTERVAL MANAGEMENT
// ^^^^^^^^^^^^^^^^^^^^^^^^^

const startInterval = () => {
    clearIntervals();
    if (pitchshift.pitch > -6) {
        interval_down = setInterval(() => {
            console.log('interval', pitchshift.pitch - 1);
            pitchshift.pitch = pitchshift.pitch - 1;
            if (pitchshift.pitch < -24) startInterval();
        }, 150);
    } else {
        interval_up = setInterval(() => {
            console.log('interval', pitchshift.pitch + 1);
            pitchshift.pitch = pitchshift.pitch + 1;
            if (pitchshift.pitch > -6) startInterval();
        }, 150);
    }
};

const clearIntervals = () => {
    if (interval_down) clearInterval(interval_down);
    if (interval_up) clearInterval(interval_up);
};

// ^^^^^^^^^^^^^^^^^^^^^^^^^
// SOUNDCASTING
// ^^^^^^^^^^^^^^^^^^^^^^^^^

export const soundcastingPrepare = async () => {
    // restart chaining
    await player.disconnect();

    // create new recorder
    const recorder = new Recorder();

    // remake chain with recorder
    await player.chain(
        distortion,
        crusher,
        feedbackDelay,
        pitchshift,
        vibrato,
        filter,
        panner,
        recorder
    );

    // start recording and playing audio
    await recorder.start();
    await restartAudio(true);

    return recorder;
};

export const endRecording = async (recorder) => {
    // stop audio
    stopAudio();

    // the recorded audio is returned as a blob
    const recording = await recorder.stop();

    // get blob url
    const url = URL.createObjectURL(recording);
    console.log('Tone.js Recorder Blob URL:', url);

    // dispose recorder
    await recorder.dispose();

    return url;
};
