import { Component, Input, OnChanges } from "@angular/core";
import { ISession, DurationPipe } from "../shared/index";

@Component({
    selector: 'session-list',
    templateUrl: './session-list.component.html'
})

export class SessionListComponent {
    @Input() sessions: ISession[] | undefined;
    @Input() filterBy: string | undefined;
    @Input() sortBy: string | undefined;

    visibleSessions: ISession[] | undefined = [];
    filterSessions(filter: string | undefined) {    
        if(filter === 'all'){
            this.visibleSessions = this.sessions!.slice(0);
        }else{
            this.visibleSessions = this.sessions!.filter(session => {
                return session.level.toLocaleLowerCase() === filter;
            })
        }
    }

    ngOnChanges() {
        if(this.sessions){
            this.filterSessions(this.filterBy);
            this.sortBy === 'name' ? this.visibleSessions!.sort(sortByNameAsc) : this.visibleSessions!.sort(sortByVotesDesc);
        }
    }
}

function sortByNameAsc(s1: ISession, s2: ISession){
    if(s1.name > s2.name) return 1;
    else if(s1.name === s2.name) return 0;
    else return -1;
}

function sortByVotesDesc(s1: ISession, s2: ISession){
    return s2.voters.length - s1.voters.length;
}
