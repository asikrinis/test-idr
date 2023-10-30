import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DigitalRootService } from './services/digital-root.service';
import { MorseCodeService } from './services/morse-code.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'seconds-operation';
  secondsForm!: FormGroup;
  digitalRootForm!: FormGroup;
  secondsTime: string | null = null;
  result: number | null = null;

  morseForm: FormGroup = new FormGroup({
    binaryInput: new FormControl(null)
  });
  decodedMessage: string | null = null;

  constructor(private digitalRootService: DigitalRootService, private morseCodeService: MorseCodeService) { }

  ngOnInit(): void {
    (window as any).angularComponentReference = this;
    this.secondsForm = new FormGroup({
      inputSeconds: new FormControl(null, [
        Validators.required,
        Validators.min(0),
        Validators.max(359999)
      ])
    });

    this.digitalRootForm = new FormGroup({
      digitalRootInput: new FormControl(null, Validators.required)
    });
  }

  convertSeconds(): void {
    if (this.secondsForm.invalid) return;

    const seconds = this.secondsForm.value.inputSeconds;
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;

    this.secondsTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }

  compute(): void {
    if (this.digitalRootForm.invalid) return;

    const inputValue = this.digitalRootForm.value.digitalRootInput;
    this.digitalRootService.computeDigitalRoot(inputValue).subscribe(result => {
      this.result = result;
    });
  }

  decodeBinary(): void {
    const bits = this.morseForm.get('binaryInput')?.value;
  }

}
