import {
    getAssessmentForm,
    getAssessmentList,
    getClassroomState,
    getExpenditures,
    getPhysicalExamResult,
    getReport,
    loseCard,
    postAssessmentForm,
} from "./lib/basics";
import {getTicket, login, logout} from "./lib/core";
import {ValidTickets} from "./utils/network";
import {getDormScore, getElePayRecord, getEleRechargePayCode} from "./lib/dorm";
import {LibBookRecord, Library, LibraryFloor, LibrarySeat, LibrarySection} from "./models/home/library";
import {
    bookLibrarySeat,
    cancelBooking,
    getBookingRecords,
    getLibraryFloorList,
    getLibraryList,
    getLibrarySeatList,
    getLibrarySectionList,
} from "./lib/library";
import {getNewsDetail, getNewsList} from "./lib/news";
import {getSchedule, getSecondaryVerbose} from "./lib/schedule";
import {Course} from "./models/home/report";
import {Form} from "./models/home/assessment";
import {Record} from "./models/home/expenditure";
import {NewsSlice, SourceTag} from "./models/news/news";
import {getCaptchaUrl, getCoursePlan, loginCr} from "./lib/cr";

export class InfoHelper {
    public userId = "";
    public password = "";
    public dormPassword = "";

    public fullName = "";
    public emailName = "";    // without host

    public MOCK = "8888";

    public static TOTAL_PHASES = 10;  // const

    public mocked = () => this.userId === this.MOCK && this.password === this.MOCK;

    public graduate = () => this.userId.length > 4 ? (this.userId[4] === "2" || this.userId[4] === "3") : false;

    public keepAliveTimer: ReturnType<typeof setInterval> | undefined;

    public loginLocked = false;

    public clearCookieHandler = async () => {
    };

    public login = async (
        auth: {
            userId?: string;
            password?: string;
            dormPassword?: string;
        },
        statusIndicator?: () => void,
    ): Promise<void> => login(this, auth.userId ?? this.userId, auth.password ?? this.password, auth.dormPassword ?? this.dormPassword, statusIndicator);

    public logout = async (): Promise<void> => logout(this);

    public getTicket = async (target: ValidTickets) => getTicket(this, target);

    public getReport = (
        bx: boolean,
        newGPA: boolean,
        flag = 1,
    ): Promise<Course[]> => getReport(this, bx, newGPA, flag);

    public getAssessmentList = (): Promise<[string, boolean, string][]> =>
        getAssessmentList(this);

    public getAssessmentForm = (url: string): Promise<Form> =>
        getAssessmentForm(this, url);

    public postAssessmentForm = (form: Form): Promise<void> =>
        postAssessmentForm(this, form);

    public getPhysicalExamResult = (): Promise<[string, string][]> =>
        getPhysicalExamResult(this);

    public getExpenditures = (
        beg: Date,
        end: Date,
    ): Promise<[Record[], number, number, number]> =>
        getExpenditures(this, beg, end);

    public getClassroomState = (
        name: string,
        week: number,
    ): Promise<[string, number[]][]> => getClassroomState(this, name, week);

    public loseCard = async (): Promise<number> => loseCard(this);

    public getDormScore = async (): Promise<string> => getDormScore(this);

    public getEleRechargePayCode = async (money: number): Promise<string> =>
        getEleRechargePayCode(this, money);

    public getElePayRecord = async (): Promise<[string, string, string, string, string, string][]> => getElePayRecord(this);

    public getLibraryList = async (): Promise<Library[]> => getLibraryList(this);

    public getLibrarySectionList = async (
        libraryFloor: LibraryFloor,
        dateChoice: 0 | 1,
    ): Promise<LibrarySection[]> =>
        getLibrarySectionList(this, libraryFloor, dateChoice);

    public getLibraryFloorList = async (
        library: Library,
        dateChoice: 0 | 1,
    ): Promise<LibraryFloor[]> => getLibraryFloorList(this, library, dateChoice);

    public getLibrarySeatList = async (
        librarySection: LibrarySection,
        dateChoice: 0 | 1,
    ): Promise<LibrarySeat[]> => getLibrarySeatList(this, librarySection, dateChoice);

    public bookLibrarySeat = async (
        librarySeat: LibrarySeat,
        section: LibrarySection,
        dateChoice: 0 | 1,
    ): Promise<{status: number; msg: string}> =>
        bookLibrarySeat(this, librarySeat, section, dateChoice);

    public getBookingRecords = async (): Promise<LibBookRecord[]> =>
        getBookingRecords(this);

    public cancelBooking = async (id: string): Promise<void> =>
        cancelBooking(this, id);

    public getNewsList = async (
        channel: SourceTag,
        page: number,
    ): Promise<NewsSlice[]> => getNewsList(this, channel, page);

    public getNewsDetail = async (
        url: string,
    ): Promise<[string, string, string]> => getNewsDetail(this, url);

    public getSchedule = async () => getSchedule(this);

    public getSecondaryVerbose = async () => getSecondaryVerbose(this);

    public getCrCaptchaUrl = async () => getCaptchaUrl();

    public loginCr = async (captcha: string) => loginCr(this, captcha);

    public getCrCoursePlan = async (semester: string) => getCoursePlan(this, semester);
}
