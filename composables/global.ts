import type {User} from "~/types/models";
import Moment from 'jalali-moment'
export const moment = Moment
export const isoToNormal = (time: string) => {
    return moment(time).locale('fa').format('jDD jMMMM | h A').replace('ب.ظ', 'عصر').replace('ق.ظ', 'صبح')
}
export const isoToMonth = (time: string) => {
    return moment(time).locale('fa').format('jMMMM')
}
export const isoToDateTime = (time: string) => {
    return moment(time).locale('fa').format('dd, DD MMM YYYY HH:mm')
}
export const isoToDate = (time: string) => {
    return moment(time).locale('fa').format('DD MMM  YYYY')
}
export const isoToTime = (time: string) => {
    return moment(time).locale('fa').format('HH:mm')
}
export const isoToWeekDay = (time: string) => {
    return moment(time).locale('fa').format('ddd')
}
export const isoToWeekDayFirstLetter = (time: string) => {
    return moment(time).locale('fa').format('dd')
}

export const isoToStandard = (time: string) => {
    return moment(time).format('MMM DD,YYYY hh:mmA')
}
// let globalFetched = false
export const useUser = async () => {
    const userId = useCookie('userId')
    const user = useLocalStorage<User | null>('user', null)
    const loading = ref(false)

    if (userId.value  ) {
        // globalFetched = true
        loading.value = true
        const { result } = await useGet<User>(`/user/${userId.value}`, {
            params: {
                'with-profile': true,
                'with-comments': true,
            }
        })
        user.value = result
        loading.value = false
    }

    const fullName = computed(() => {
        if (!user.value?.profile) return ''
        return `${user.value.profile.firstName} ${user.value.profile.lastName}`
    })

    const avatar = computed(() => {
        return user.value?.profile?.avatar || ''
    })

    return { user, fullName, avatar, loading }
}

export const useOtpTimer = () => {
    const timeLeft = useState<number>('otp-timer-timeLeft', () => 0)
    const intervalId = useState<ReturnType<typeof setInterval> | null>('otp-timer-interval', () => null)

    const startTimer = (duration = 120) => {
        clearTimer()
        timeLeft.value = duration

        intervalId.value = setInterval(() => {
            if (timeLeft.value > 0) {
                timeLeft.value--
            } else {
                clearTimer()
            }
        }, 1000)
    }

    const clearTimer = () => {
        if (intervalId.value) {
            clearInterval(intervalId.value)
            intervalId.value = null
        }
    }

    const isRunning = computed(() => timeLeft.value > 0)
    const formattedTime = computed(() => {
        const minutes = Math.floor(timeLeft.value / 60).toString().padStart(2, '0')
        const seconds = (timeLeft.value % 60).toString().padStart(2, '0')
        return `${minutes}:${seconds}`
    })

    return {
        timeLeft,
        startTimer,
        clearTimer,
        isRunning,
        formattedTime
    }
}
export const getCommentsAvg = (comments: any[]) => {
    const scores = comments?.map(e => e.number)
    const sum = scores?.reduce((sum, accumolator) => sum + accumolator, 0) || 0
    const average = comments?.length > 0 ? sum / scores.length : 0
    return average.toFixed(1)
}
export const direction = async (origin: address, destination: address) => {
    const type: 'motorcycle' | 'car' = 'motorcycle'
    const result = await $fetch(`https://api.neshan.org/v4/direction`,
        {
            method: 'GET',
            headers: {
                'Api-Key': NESHAN_API_KEY,
            },
            params: {
                type: type,
                origin: [origin[1], origin[0]].join(','),
                destination: [destination[1], destination[0]].join(','),
                // avoidTrafficZone:false,
                // avoidOddEvenZone:false,
                // alternative:false
            }
        })
    console.log(result)
    return result?.routes?.[0]?.overview_polyline?.points
}

export const isValidEmail = (email:string) => {
    const regex = /^\S+@\S+\.\S+$/;
    return regex.test(email);
}
export const truncateText=(text:string , maxLength:number)=>{
    return text?.length > maxLength ? text.slice(0,maxLength) + '...' : text;
}
export let NESHAN_API_KEY ='service.2ef9bc7ffd1f4c7eaba538fec1ae0c8d'
export let NESHAN_WEB_KEY ='web.6f82249a539940388cd4297a843990a2'
import type {Coordinate} from "ol/coordinate";
export const formattedAddress = async ([lng, lat]: [number, number]) => {
    const result = await $fetch(`https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lng}`,
        {
            method: 'GET',
            headers: {
                'Api-Key': 'service.2ef9bc7ffd1f4c7eaba538fec1ae0c8d',
            },
        })
    return result?.formatted_address
}

export const geoCodingAddress = async (address: string, coords: Coordinate) => {
    return await $fetch(`https://api.neshan.org/v1/search?term=${address}&lat=${coords[1]}&lng=${coords[0]}`,
        {
            method: 'GET',
            headers: {
                'Api-Key': NESHAN_API_KEY,
            },
        })
}
