import {
    Player,
    AutoFilter,
    Distortion,
    Destination,
    FeedbackDelay,
    BitCrusher,
    FrequencyShifter,
    PitchShift,
    LFO,
    Vibrato,
    AutoPanner
} from 'tone';

// initialize variables
let player;
let interval_up, interval_down;
let finished = false;
let feedbackDelay, filter, distortion, crusher, pitchshift, vibrato, panner;
let lfo;

// PREPARE PLAYER

export const preparePlayer = async (blob) => {
    // load audio file
    player = new Player(blob).toDestination();

    // play as soon as the buffer is loaded
    player.autostart = true;

    // create effects
    createEffects();

    // connect chain of effects
    createChain();

    // create event listener on stop
    // - update finished
    // - clear intervals
    player.onstop = function () {
        finished = true;
        clearIntervals();
    };

    // log errors
    player.onerror = function () {
        console.log('Error');
    };
};

// CHANGE TO EFFECT

export const noEffect = () => {
    restartEffects();
    restartAudioIfFinished();
};

export const addCaveEffect = () => {
    restartEffects();
    feedbackDelay.wet.linearRampToValueAtTime(1, player.now() + 0.5);
    restartAudioIfFinished();
};

export const addRandomEffect = () => {
    restartEffects();
    vibrato.wet.linearRampToValueAtTime(1, player.now() + 0.5);
    panner.wet.linearRampToValueAtTime(1, player.now() + 0.5);
    restartAudioIfFinished();
};

export const addLoBatEffect = () => {
    console.log('addLoBatEffect');
    restartEffects();
    restartAudioIfFinished(true);

    crusher.wet.linearRampToValueAtTime(1, player.now() + 0.5);

    pitchshift.wet.linearRampToValueAtTime(1, player.now() + 0.5);
    pitchshift.pitch = 0;
    setTimeout(() => {
        startInterval();
    }, 200);

    restartAudioIfFinished();
};

// utility

const restartEffects = () => {
    clearIntervals();

    // distortion,
    // crusher,
    // feedbackDelay,
    // pitchshift,
    // vibrato,
    // filter,
    // panner,

    distortion.wet.linearRampToValueAtTime(0, player.now() + 0.5);
    crusher.wet.linearRampToValueAtTime(0, player.now() + 0.5);
    feedbackDelay.wet.linearRampToValueAtTime(0, player.now() + 0.5);
    pitchshift.wet.linearRampToValueAtTime(0, player.now() + 0.5);
    vibrato.wet.linearRampToValueAtTime(0, player.now() + 0.5);
    filter.wet.linearRampToValueAtTime(0, player.now() + 0.5);
    panner.wet.linearRampToValueAtTime(0, player.now() + 0.5);
};

export const restartAudioIfFinished = (force = false) => {
    if (player && player.loaded) {
        if (finished || force) {
            player.restart();
            player.start();
            finished = false;
        }
    }
};

export const toggleAudio = () => {
    if (player && player.loaded) {
        if (!finished) {
            player.stop();
        } else {
            restartAudioIfFinished();
        }
    }
};

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

const createChain = () => {
    player.chain(
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

// export default player;
