import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ReactiveFormsAutoCompleteSearchingService } from './reactive-forms-auto-complete-searching.service';

import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

describe('ReactiveFormsAutoCompleteSearchingService', () => {
  let service: ReactiveFormsAutoCompleteSearchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReactiveFormsAutoCompleteSearchingService]
    });
    service = TestBed.inject(ReactiveFormsAutoCompleteSearchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('searchStation', () => {
    describe('When the stationName is a empty string', () => {
      const stationName = '';
      it('should return a Observable', () => {
        // Act
        const result = service.searchStation(stationName);
        // Assert
        expect(result).toBeInstanceOf(Observable);
      });

      it('should call function "get" of the "HttpClient" with the correct API\'s URL', () => {
        // Arrange
        const apiUrl = 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/Station/TRTC?$format=JSON';
        const httpClient = TestBed.inject(HttpClient);
        spyOn(httpClient, 'get');
        // Act
        service.searchStation(stationName);
        // Assert
        expect(httpClient.get).toHaveBeenCalledWith(apiUrl);
      });
    });

    describe('When the stationName is a valid string', () => {
      const stationName = 'Leo';
      it('should return a Observable', () => {
        // Act
        const result = service.searchStation(stationName);
        // Assert
        expect(result).toBeInstanceOf(Observable);
      });

      it('should call function "get" of the "HttpClient" with the correct API\'s URL', () => {
        // Arrange
        const apiUrl = 'https://ptx.transportdata.tw/MOTC/v2/Rail/Metro/Station/TRTC?$format=JSON&$filter=contains(StationName/Zh_tw,\'Leo\')';
        const httpClient = TestBed.inject(HttpClient);
        spyOn(httpClient, 'get');
        // Act
        service.searchStation(stationName);
        // Assert
        expect(httpClient.get).toHaveBeenCalledWith(apiUrl);
      });
    });
  });
});
