const getRemainTime = daadline => {

    let now = new Date(),
        remainTime = (new Date(daadline) - now + 1000) / 1000,
        remainSeconds = ('0' + Math.floor(remainTime % 60)).slice(-2),
        remainMinutes = ('0' + Math.floor(remainTime / 60 % 60)).slice(-2),
        remainHours = ('0' + Math.floor(remainTime / 3600 % 24)).slice(-2),
        remaiDays = Math.floor(remainTime / (3600 * 24));

    return {
        remainTime,
        remainSeconds,
        remainMinutes,
        remaiDays,
        remainHours
    }
};

console.log(getRemainTime(' oct 17 2019 21:12:42 GMT-0400'));

const countDown = (deadline, elem, finalMesaasge) => {
    const el = document.getElementById(elem);

    const timerUpdate = setInterval(() => {
        let t = getRemainTime(deadline);
        el.innerHTML = `
            <div class="flex-center">
                <div class="time-day">
                ${t.remaiDays}
                 </div>
                <div class="time-hour">
                ${t.remainHours}
                </div>
                <div class="time-minute">
                ${t.remainMinutes}
                </div>
                <div class="time-second">
                 ${t.remainSeconds}
                </div>
            </div>
            <div class="flex-center-literal">
                <div class="time-literal">
                    D
                </div>
                <div class="time-literal">
                    H
                </div>
                <div class="time-literal">
                    M
                </div>
                <div class="time-literal">
                    S
                </div>
            </div>
            `;

        if (t.remainTime <= 1) {
            clearInterval(timerUpdate);
            el.innerHTML = finalMesaasge;
            
        };

    }, 1000);
}

countDown('July 24 2019 12:48:00 GMT-0400', 'clock','' )


// remainDays = Math.floor((remainTime / (3600 * 24)) / 7);
// remainMonth = Math.floor(remainTime / (3600 * 168));
